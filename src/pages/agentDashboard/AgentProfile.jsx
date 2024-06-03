import useAuth from "../../hooks/useAuth";

const AgentProfile = () => {
  const { savedUser } = useAuth();
  const { image, email, name, role } = savedUser;
  return (
    <div className="bg-base-100 p-3 md:p-5 lg:p-8 flex gap-2 rounded-lg">
      <div className="avatar">
        <div className="w-24 rounded">
          <img src={image} />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg md:text-2xl font-medium">{name}</h3>
        <p>
          <span className="font-semibold">Email: </span> {email}
        </p>
        <p>
          <span className="font-semibold">Role: </span>
          {role}
        </p>
      </div>
    </div>
  );
};
export default AgentProfile;
