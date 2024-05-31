import PageBanner from "../../components/PageBanner";
import bannerbg from "../../assets/justbanner.png";
const Login = () => {
  return (
    <div>
      <PageBanner
        bannerBg={bannerbg}
        headline={"Login"}
        text="Login if your are registered"
      ></PageBanner>
    </div>
  );
};

export default Login;
