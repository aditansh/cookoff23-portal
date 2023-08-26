import useMousePosition from "../utils/useMousePosition";
import styles from "./home.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import hovercook from "../assets/hover-cookoff.svg";
import cookoff from "../assets/cookoff.svg";
import logo from "../assets/logo.svg";
import Image from "next/image";

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  const handleClick = () => {
    setTimeout(() => {
      setisClicked(true);
    }, 300);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className={styles.master}>
      {isClicked ? (
        <>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={styles.main}
          >
            <motion.div
              className={styles.mask}
              animate={{
                WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                WebkitMaskSize: `${size}px`,
              }}
              transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
            >
              <Image
                src={hovercook}
                alt="hoverCook"
                quality={100}
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
              />
            </motion.div>
            <div className={styles.body}>
              <Image src={cookoff} quality={100} alt="cookoff" />
            </div>
          </motion.main>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center items-start "
          >
            <div>
              <form className="w-[350px]" onSubmit={handleSubmit}>
                <div className="mb-[40px]">
                  <input
                    className="w-full py-[18px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    className="w-full py-[18px] px-[33px] text-[#D9D9D999] bg-[#1F1F1F] rounded-[25px] text-[22px] font-semibold"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="uppercase text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
                    type="submit"
                  >
                    Let&apos;s Get Cooking
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center items-center flex-col mt-36 mx-32"
        >
          <div className="flex w-[310px] mb-10">
            <Image src={logo} quality={100} alt="logo" />
          </div>
          <motion.button
            className="flex uppercase text-[#878787] text-2xl hover:text-[24px] px-[89px] py-[20px] border-[4px] border-[#878787] rounded-[50px] hover:bg-[#878787] hover:text-black"
            id="font_ITC"
            whileTap={{ scale: 0.9 }}
            animate={isClicked ? "is" : "isNot"}
            onTap={handleClick}
          >
            Start
          </motion.button>
        </motion.div>
      )}
      ;
    </div>
  );
}

export default App;