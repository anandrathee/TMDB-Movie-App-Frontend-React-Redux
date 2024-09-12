import loader from "/loader.gif";

const Loading = () => {
  return (
    <div className=" w-full h-screen bg-black flex items-center justify-center">
        <img className="h-48 w-48" src={loader} alt="" />
    </div>
  )
}

export default Loading