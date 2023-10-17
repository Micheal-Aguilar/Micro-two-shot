import React, { useEffect, useState } from "react";


const HatsForm = () => {
  const [locations, setLocations] = useState([]);
  const [fabric, setFabric] = useState("");
  const [styleName, setStyleName] = useState("");
  const [color, setColor] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [location, setLocation] = useState("");

  const handleFabricChange = (event) => {
    const value = event.target.value;
    setFabric(value);
  };

  const handleStyleNameChange = (event) => {
    const value = event.target.value;
    setStyleName(value);
  };

  const handleColorNameChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handlePictureURLChange = (event) => {
    const value = event.target.value;
    setPictureURL(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const fetchData = async () => {
    const url = "http://localhost:8100/api/locations";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.style_name = styleName;
    data.fabric = fabric;
    data.color = color;
    data.picture_url = pictureURL;
    data.location = location;

    const hatUrl = `http://localhost:8090/api/locations/${location}/hats/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
      const newHat = await response.json();
      console.log(newHat);
    }

    setFabric("");
    setStyleName("");
    setColor("");
    setPictureURL("");
    setLocation("");
    };

    
  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new hat</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFabricChange}
                  placeholder="fabric"
                  required
                  type="text"
                  id="fabric"
                  name="fabric"
                  className="form-control"
                  value={fabric}
                />
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleStyleNameChange}
                  placeholder="Style Name"
                  required
                  type="text"
                  id="styleName"
                  name="styleName"
                  className="form-control"
                  value={styleName}
                />
                <label htmlFor="styleName">Style Name</label>
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
                  placeholder="Picture URL"
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
                  onChange={handleLocationChange}
                  required
                  id="location"
                  name="location"
                  className="form-select"
                  value={location}
                >
                  <option value="">Choose a location</option>
                  {locations.map((location) => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.closet_name} - {location.section_number}/{location.shelf_number}
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

export default HatsForm;
