import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();

    const { contract } = state;

    if (!contract) {
      alert("Please connect wallet first");
      return;
    }

    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;

    try {
      const amount = {
        value: ethers.parseEther("0.001"),
      };

      const transaction = await contract.buyChai(
        name,
        message,
        amount
      );

      await transaction.wait();

      alert("Chai bought successfully!");

      console.log("Transaction completed");
    } catch (error) {
      console.log(error);
      alert("Transaction failed");
    }
  };

  return (
    <>
      <div
        className="container-md"
        style={{ width: "50%", marginTop: "25px" }}
      >
        <form onSubmit={buyChai}>

          <div className="mb-3">
            <label className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
              required
            />
          </div>


          <div className="mb-3">
            <label className="form-label">
              Message
            </label>

            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
              required
            />
          </div>


          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay 0.001 ETH
          </button>

        </form>
      </div>
    </>
  );
};

export default Buy;