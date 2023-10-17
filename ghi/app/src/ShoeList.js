import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const ShoeList = () => {
  const [shoeList, setShoeList] = useState([]);

  const getShoeList = async () => {
    const shoeResponse = await fetch("http://localhost:8080/api/shoes/");
    if (shoeResponse.ok) {
      const shoeData = await shoeResponse.json();
      setShoeList(shoeData.shoes);
    } else {
      setShoeList([]);
    }
  };

  useEffect(() => {
    getShoeList();
  }, [shoeList]);

  const handleDelete = async (event) => {
    const shoeId = event.target.value;
    const shoeUrl = `http://localhost:8080/api/shoes/${shoeId}`;
    const fetchConfig = {
      method: "delete",
    };
    const response = await fetch(shoeUrl, fetchConfig);
    if (response.status === 200) {
      const updatedShoeList = shoeList.filter((shoe) => shoe.id !== shoeId);
      setShoeList(updatedShoeList);
    }
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Color</th>
            <th>Bin</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {shoeList.map((shoe) => {
            return (
              <tr key={shoe.id}>
                <td>{shoe.model_name}</td>
                <td>{shoe.manufacturer_name}</td>
                <td>{shoe.color}</td>
                <td>
                  {shoe.assigned_bin.closet_name} -
                  {shoe.assigned_bin.bin_number}/{shoe.assigned_bin.bin_size}
                </td>
                <td>{shoe.picture_url}</td>
                <td>
                  <button
                    onClick={handleDelete}
                    className="btn btn-primary"
                    value={shoe.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="new" className="btn btn-primary btn-lg px-4 gap-3">
          Add A Shoe
        </Link>
      </div>
    </>
  );
};

export default ShoeList;
