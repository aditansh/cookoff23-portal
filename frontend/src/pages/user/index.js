import Navbar from "@/components/Navbar";
import RoundWise from "@/components/roundWise";
import CurrentProfile from "@/components/CurrentProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTokenStore from "@/store/tokenProvider";
import axios from "axios";
import RefreshToken from "@/utils/RefreshToken";

function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [qArr, setQArr] = useState([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  useEffect(() => {
    async function fetchDataDash() {
      const access_token = localStorage.getItem("access_token");
      console.log(access_token);
      try {
        const response = await axios.get("https://api-cookoff-prod.codechefvit.com/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        // console.log(response.data);
        setName(response.data.name);
        setRound(response.data.roundQualified + 1);
        setScore(response.data.score);
        localStorage.setItem("round", response.data.roundQualified + 1);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("access_token");
          useTokenStore.setState({
            access_token: "",
          });
          router.push("/login");
        } else {
          console.log(error);
        }
      }
    }
    async function fetchDataRound(){
      const access_token = localStorage.getItem("access_token");
      try{
        const response = await axios.post(
          "https://api-cookoff-prod.codechefvit.com/ques/getRound",
          { round: round},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const responseData = response.data;
        if (responseData && responseData.length > 0) {
          setQArr(responseData);
        } else {
          console.log("No data received from the API.");
        }
      } catch(error){
        if (error.response && error.response.status === 404) {
          console.log("No questions");
        }
      }
    }
    async function action(){
      await fetchDataDash();
      await fetchDataRound();
    } 
    action();
  }, []);

  return (
    <>
      <main>
        <Navbar />
        <div className="flex">
          <CurrentProfile name={name} round={round} />
          <RoundWise round={round} score={score} qArr={qArr} />
        </div>
      </main>
    </>
  );
}

export default Dashboard;