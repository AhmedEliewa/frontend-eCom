import { useAppSelector } from "@/store/hooks";

const Account = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <ul>
        <li>
          Name: {user?.firstName} {user?.lastName}
        </li>
        <li>Email: {user?.email}</li>
      </ul>
    </>
  );
};

export default Account;
