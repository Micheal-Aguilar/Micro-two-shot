import { useState } from "react";
import { Link } from "react-router-dom";
function ListHats() {
  const [hats, setHats] = useState([]);

  async function loadHats() {
    const hatResponse = await fetch("http://localhost:8090/api/hats/");
    if (hatResponse.ok) {
      const hatData = await hatResponse.json();
      setHats(hatData.hats);
    } else {
      setHats([]);
    }
  }
  loadHats();
  const handleDelete = async (event) => {
    const hatId = event.target.value;
    const hatURL = `http://localhost:8090/api/hats/${hatId}`;
    const fetchConfig = { method: "delete",};
    const response = await fetch(hatURL, fetchConfig);
    if (response.status === 200) {
      const updatedhatlist = hats.filter((hat) => hat.id !== hatId);
      setHats(updatedhatlist);
    }
  };
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>fabric</th>
            <th>Style</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {hats.map((hat) => {
            return (
              <tr key={hat.id}>
                <td>{hat.fabric}</td>
                <td>{hat.style_name}</td>
                <td>{hat.color}</td>
                <td>{hat.picture_url}</td>
                <td>
                  {hat.location.closet_name} -{hat.location.section_number} /
                  {hat.location.shelf_number}
                </td>
                <td>
                  <button onClick={handleDelete} value={hat.id}>
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="new" className="btn btn-primary btn-lg px-4 gap-3">
          Add A Hat
        </Link>
      </div>
    </>
  );
}

export default ListHats;
