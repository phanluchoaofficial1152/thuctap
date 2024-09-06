import dynamic from "next/dynamic";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = dynamic(() => import("@/app/components/Home/page"), {
  loading: () => <CircularProgress />,
});

const Home = () => {
  return <HomePage />;
};

export default Home;
