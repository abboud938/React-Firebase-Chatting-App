import { ToastContainer , Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Notification = () =>  {
    return (
      <div className="">

        <ToastContainer position="bottom-center" transition={Zoom} autoClose={1000}/> 

      </div>
    )
  
}

export default Notification