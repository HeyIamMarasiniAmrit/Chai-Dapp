import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);

  const { contract } = state;

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const data = await contract.getMemos();
        setMemos(data);
      } catch (error) {
        console.log("Error fetching memos:", error);
      }
    };

    if (contract) {
      fetchMemos();
    }
  }, [contract]);


  return (
    <div className="container mt-4">

      <h4 className="text-center mb-4">
        Messages
      </h4>


      <div className="table-responsive">

        <table className="table table-bordered table-striped">

          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Message</th>
              <th>From</th>
            </tr>
          </thead>


          <tbody>

            {memos.map((memo, index) => (

              <tr key={index}>

                <td>
                  {memo.name}
                </td>


                <td>
                  {
                    new Date(
                      Number(memo.timestamp) * 1000
                    ).toLocaleString()
                  }
                </td>


                <td>
                  {memo.message}
                </td>


                <td>
                  {memo.from}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};


export default Memos;