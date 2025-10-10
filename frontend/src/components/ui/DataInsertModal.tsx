import axios from "axios";
import {
  Button,
  Checkbox,
  Datepicker,
  FileInput,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import React, { useState, useEffect } from "react";

const DataInsertModal = ({
  title,
  fields,
  openModal,
  onCloseModal,
}: {
  title: string;
  fields: { name: string; type: string; options?: string[] }[];
  openModal: boolean;
  onCloseModal: () => void;
}) => {
  const [formData, setFormData] = useState<{
    [key: string]: string | string[];
  }>({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [parentEvents, setParentEvents] = useState<
    { _id: string; title: string }[]
  >([]);
  const [parentEventId, setParentEventId] = useState<string>("");
  const [timeData, setTimeData] = useState<{ [key: string]: string }>({});

  const handleChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Fetch parent events on mount
  useEffect(() => {
    const fetchParentEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/event`
        );
        const parents = response.data.filter((ev: any) => ev.type === "parent");
        setParentEvents(
          parents.map((e: any) => ({ _id: e._id, title: e.title }))
        );
      } catch (e) {
        setParentEvents([]);
      }
    };
    fetchParentEvents();
  }, []);

  const handleCheckboxChange = (
    fieldName: string,
    option: string,
    checked: boolean
  ) => {
    setFormData((prevData) => {
      const currentValues = Array.isArray(prevData[fieldName])
        ? (prevData[fieldName] as string[])
        : [];

      if (checked) {
        return {
          ...prevData,
          [fieldName]: [...currentValues, option],
        };
      } else {
        return {
          ...prevData,
          [fieldName]: currentValues.filter((value) => value !== option),
        };
      }
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Improved time and date handling

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError("");

    let imageUrl = "";

    // Handle file upload first if there's a selected file
    if (selectedFile) {
      try {
        const signedResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signed-url`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { signature, expire, token: imageKitToken } = signedResponse.data;

        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        // FIX: Use formData state for title or fallback to current title
        const titleField = formData["title"] || formData["name"] || title;
        uploadFormData.append(
          "fileName",
          `${title}-${titleField}-${Date.now()}`
        );
        uploadFormData.append(
          "folder",
          `/Prabhupada_Network/${title.toLowerCase()}s`
        );
        uploadFormData.append("signature", signature);
        uploadFormData.append("expire", expire);
        uploadFormData.append("token", imageKitToken);
        uploadFormData.append(
          "publicKey",
          process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!
        );

        const uploadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_IMAGEKIT_URL}`,
          uploadFormData
        );
        imageUrl = uploadResponse.data.url;
      } catch (error: any) {
        setError(error.response?.data?.message || "Image upload failed");
        console.error("Image Upload Failed: ", error);
        setLoading(false);
        return;
      }
    }

    try {
      const submitData = { ...formData };

      // Add image URL if file was uploaded
      if (imageUrl) {
        submitData.imageUrl = imageUrl;
      }

      // Add parent event ID if present
      if (parentEventId) {
        submitData.parentEventId = parentEventId;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${title.toLowerCase()}`,
        submitData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`${title === "Join-Us" ? "You are" : title} added successfully`);
      onCloseModal();

      // Reset form
      setFormData({});
      setSelectedFile(null);
      setParentEventId("");
      setTimeData({});
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={openModal} onClose={onCloseModal} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-fontApp pb-2">{title}</h3>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {title === "Event" && (
            <div>
              <label className="block text-sm font-medium text-fontApp mb-1">
                Event Type
              </label>
              <Select
                value={formData["type"] || ""}
                onChange={(e) => handleChange("type", e.target.value)}
                required
              >
                <option value="">Select type</option>
                <option value="parent">Parent Event</option>
                <option value="child">Child Event</option>
              </Select>
            </div>
          )}

          {/* Show parent event dropdown if not creating a parent event */}
          {title === "Event" && formData["type"] === "child" && (
            <div>
              <label className="block text-sm font-medium text-fontApp mb-1">
                Select Parent Event
              </label>
              <Select
                value={parentEventId}
                onChange={(e) => setParentEventId(e.target.value)}
              >
                <option value="">No Parent</option>
                {parentEvents.map((ev) => (
                  <option key={ev._id} value={ev._id}>
                    {ev.title}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {fields.map(
            (field: { name: string; type: string; options?: string[] }) => (
              <div key={field.name} className="space-y-1">
                {field.type === "string" && (
                  <TextInput
                    id={field.name}
                    placeholder={`Enter ${field.name}`}
                    value={formData[field.name] || ""}
                    onChange={(event) =>
                      handleChange(field.name, event.target.value)
                    }
                    required
                  />
                )}

                {field.type === "img" && (
                  <div>
                    <label className="block text-sm font-medium text-fontApp mb-1">
                      {field.name}
                    </label>
                    <FileInput
                      id={field.name}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                {field.type === "checkbox" && field.options && (
                  <div className="space-y-2">
                    <div className="block text-sm font-medium text-fontApp">
                      {field.name}
                    </div>
                    <div className="space-y-1">
                      {field.options.map((option) => (
                        <div key={option} className="flex items-center">
                          <Checkbox
                            id={`${field.name}-${option}`}
                            checked={
                              Array.isArray(formData[field.name]) &&
                              (formData[field.name] as string[]).includes(
                                option
                              )
                            }
                            onChange={(e) =>
                              handleCheckboxChange(
                                field.name,
                                option,
                                e.target.checked
                              )
                            }
                          />
                          <label
                            htmlFor={`${field.name}-${option}`}
                            className="ml-2 text-sm text-fontApp"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {field.type === "date" && (
                  <div>
                    <label className="block text-sm font-medium text-fontApp mb-1">
                      {field.name}
                    </label>
                    <div className="flex gap-2 items-center">
                      <Datepicker
                        id={field.name}
                        placeholder={`Select ${field.name}`}
                        value={
                          formData[field.name]
                            ? new Date(formData[field.name] as string)
                            : undefined
                        }
                        onChange={(date: Date | null) => {
                          if (date) {
                            const currentTime = timeData[field.name] || "00:00";
                            const [hours, minutes] = currentTime.split(":");
                            date.setHours(parseInt(hours), parseInt(minutes));
                            handleChange(field.name, date.toISOString());
                          } else {
                            handleChange(field.name, "");
                          }
                        }}
                        className="flex-1"
                        required
                      />
                      <input
                        type="time"
                        id={`${field.name}-time`}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-28"
                        value={
                          formData[field.name]
                            ? new Date(
                                formData[field.name] as string
                              ).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            : timeData[field.name] || "00:00"
                        }
                        onChange={(e) => {
                          const time = e.target.value;
                          setTimeData((prev) => ({
                            ...prev,
                            [field.name]: time,
                          }));

                          if (formData[field.name]) {
                            const date = new Date(
                              formData[field.name] as string
                            );
                            const [hours, minutes] = time.split(":");
                            date.setHours(parseInt(hours), parseInt(minutes));
                            handleChange(field.name, date.toISOString());
                          } else {
                            // If no date selected yet, use today's date with the time
                            const today = new Date();
                            const [hours, minutes] = time.split(":");
                            today.setHours(parseInt(hours), parseInt(minutes));
                            handleChange(field.name, today.toISOString());
                          }
                        }}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          )}

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-primary2 hover:bg-primary2/90 text-white"
              disabled={loading}
            >
              {loading ? `Adding ${title}` : `Add ${title}`}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DataInsertModal;
