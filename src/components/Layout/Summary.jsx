import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/profileSlice";
import { getBalance } from "../../redux/transactionSlice";
import { useEffect, useState } from "react";

const Summary = () => {
  const dispatch = useDispatch();
  const { data: profile, loading: loadingProfile, error: errorProfile } = useSelector(
    (state) => state.profile
  );
  const [showBalance, setShowBalance] = useState(false);
  const { balance, loading: loadingBalance, error: errorBalance } = useSelector(
    (state) => state.transactions
  );
  const handleImageError = (e) => {
    e.target.src = "/assets/img/ProfilePhoto.png"; 
  };
  console.log(balance, "balance oek")

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(getBalance());
  }, [dispatch]);

  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* Profile Section */}
      <div className="w-1/2">
        <div className="rounded-full border-2 border-neutral-500 w-fit">
          <img
            src={profile?.profile_image}
            alt="Profile"
            onError={handleImageError}
            className="w-16 h-16 object-cover rounded-full"
          />
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-xl font-semibold">Selamat datang,</p>
          {loadingProfile ? (
            <p className="text-3xl font-bold text-neutral-400">Loading...</p>
          ) : errorProfile ? (
            <p className="text-3xl font-bold text-red-500">Error fetching profile</p>
          ) : (
            <p className="text-3xl font-bold capitalize">
              {profile?.first_name || "Name Not Found"} {profile?.last_name || ""}
            </p>
          )}
        </div>
      </div>

      {/* Balance Section */}
      <div
  className="w-1/2 bg-cover px-4 py-8 rounded-2xl flex flex-col justify-between text-white"
  style={{ backgroundImage: `url("/assets/img/BackgroundSaldo.png")` }}
>
        <p className="text-xs font-medium">Saldo Anda</p>
        <p className="text-3xl font-semibold">
          {loadingBalance
            ? "Loading..."
            : errorBalance
            ? "Error"
            : showBalance
            ? `Rp ${balance || "0"}`
            : "Rp •••••••"}
        </p>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setShowBalance((prev) => !prev)}
        >
          <p className="text-xs font-medium">
            {showBalance ? "Tutup Saldo" : "Lihat Saldo"}
          </p>
          {showBalance ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </div>
      </div>
    </div>
  );
};

export default Summary;
