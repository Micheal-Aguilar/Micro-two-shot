import React, { useEffect, useState } from "react";

const ShoeForm = () => {
  const [bins, setBins] = useState([]);
  const [modelName, setModelName] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [color, setColor] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [bin, setBin] = useState("");

  const handleModelNameChange = (event) => {
    const value = event.target.value;
    setModelName(value);
  };

  const handleManufacturerNameChange = (event) => {
    const value = event.target.value;
    setManufacturerName(value);
  };

  const handleColorNameChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handlePictureURLChange = (event) => {
    const value = event.target.value;
    setPictureURL(value);
  };

  const handleBinChange = (event) => {
    const value = event.target.value;
    setBin(value);
  };

  const fetchData = async () => {
    const url = "http://localhost:8100/api/bins";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setBins(data.bins);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.model_name = modelName;
    data.manufacturer_name = manufacturerName;
    data.color = color;
    data.picture_url = pictureURL;
    data.assigned_bin = bin;

    const shoeUrl = "http://localhost:8080/api/shoes/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(shoeUrl, fetchConfig);
    if (response.ok) {
      const newShoe = await response.json();
    }

    setModelName("");
    setManufacturerName("");
    setColor("");
    setPictureURL("");
    setBin("");
  };
  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new shoe</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleModelNameChange}
                  placeholder="Model Name"
                  required
                  type="text"
                  id="model_name"
                  name="model_name"
                  className="form-control"
                  value={modelName}
                />
                <label htmlFor="model_name">Model Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleManufacturerNameChange}
                  placeholder="Manufacturer Name"
                  required
                  type="text"
                  id="manufacturer_name"
                  name="manufacturer_name"
                  className="form-control"
                  value={manufacturerName}
                />
                <label htmlFor="manufacturer_name">Manufacturer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleColorNameChange}
                  placeholder="Color"
                  required
                  type="text"
                  id="color"
                  name="color"
                  className="form-control"
                  value={color}
                />
                <label htmlFor="color">Color</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handlePictureURLChange}
                  placeholder="Pitcture URL"
                  required
                  type="url"
                  id="picture_url"
                  name="picture_url"
                  className="form-control"
                  value={pictureURL}
                />
                <label htmlFor="picture_url">Picture URL</label>
              </div>

              <div className="mb-3">
                <select
                  onChange={handleBinChange}
                  required
                  id="assigned_bin"
                  name="assigned_bin"
                  className="form-select"
                  value={bin}
                >
                  <option value="">Choose a bin</option>
                  {bins.map((bin) => {
                    return (
                      <option key={bin.href} value={bin.href}>
                        {bin.closet_name} - {bin.bin_number}/{bin.bin_size}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoeForm;
