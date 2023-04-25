import Spinner from "../Spinner/Spinner";

function LoadingView() {
  return (
    <div className="fixed bottom-0 left-0 z-[1000] w-screen h-screen bg-opacity-75 bg-slate-500">
      <div className="flex align-middle items-center justify-center content-center h-full">
        <Spinner />
      </div>
    </div>
  );
}

export default LoadingView;
