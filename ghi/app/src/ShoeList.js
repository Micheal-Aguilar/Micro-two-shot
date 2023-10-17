import { Link } from "react-router-dom";

const ShoeList = ({ shoes }) => {
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
          {shoes.map((shoe) => {
            return (
              <tr key={shoe.id}>
                <td>{shoe.model_name}</td>
                <td>{shoe.manufacturer_name}</td>
                <td>{shoe.color}</td>
                <td>
                  {" "}
                  {shoe.assigned_bin.closet_name} -{" "}
                  {shoe.assigned_bin.bin_number}/{shoe.assigned_bin.bin_size}
                </td>
                <td>{shoe.picture_url}</td>
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
