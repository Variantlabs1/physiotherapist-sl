import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import classes from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const Navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <Box className={classes.rootDiv}>
      <Flex className={classes.navbar}>
        <VStack className={classes.navImage}>
          <Image className={classes.logo} src={logo} />
          <Text className={classes.text}>vigour</Text>
        </VStack>
        <Flex className={classes.navButtons}>
          <Button
            className={classes.signUp}
            onClick={() => {
              Navigate("/signup");
            }}
          >
            Sign Up
          </Button>
          <Button
            className={classes.signIn}
            onClick={() => {
              Navigate("/login");
            }}
          >
            Sign In
          </Button>
        </Flex>
      </Flex>
      <div className={classes.mobileNavbar}>
        <Flex className={classes.top}>
          <Center className={classes.leftIcon} onClick={toggleDropdown}>
            <HiBars3BottomLeft />
          </Center>
          <HStack className={classes.navContainer}>
            <VStack className={classes.navImage}>
              <Image className={classes.logo} src={logo} />
              <Text className={classes.text}>vigour</Text>
            </VStack>
          </HStack>
        </Flex>
        <AnimatePresence>
          {isDropdownOpen && (
            <Flex className={classes.dropdownContainer}>
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className={classes.dropdown}
              >
                <button
                  onClick={() => {
                    Navigate("/home");
                  }}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    Navigate("/signup");
                  }}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    Navigate("/login");
                  }}
                >
                  Sign In
                </button>
              </motion.div>
              <Box className={classes.dropdownButton}>
                <Button>Buy now</Button>
              </Box>
            </Flex>
          )}
        </AnimatePresence>
      </div>
    </Box>
  );
}
