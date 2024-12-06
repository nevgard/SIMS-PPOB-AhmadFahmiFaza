const AuthToast = ({ message, setToast, type }) => {
  console.log(type)
  return (
    <div className="absolute flex justify-center bottom-8 w-[50%] left-0">
      <div
        className={` w-[80%] py-2 px-4 flex justify-between text-center  text-sm font-semibold ${
          type === "success"
            ? "bg-emerald-50 text-emerald-500"
            : "text-red-500 bg-red-50"
        }`}
      >
        <span>{message}</span>
        <span className="cursor-pointer" onClick={() => setToast()}>
          x
        </span>
      </div>
    </div>
  );
};

export default AuthToast;
