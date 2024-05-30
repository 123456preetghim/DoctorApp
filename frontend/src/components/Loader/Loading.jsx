import HashLoader from "react-spinners/HashLoader";

const Loading = () => { // Fixed function syntax
  return (
    <div className="flex items-center justify-center w-full h-full">
      <HashLoader color="#0067FF" />
    </div>
  );
};

export default Loading; // Fixed export statement
