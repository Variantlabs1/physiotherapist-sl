import React, { useEffect } from "react";
import classes from "./About.module.scss";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box className={classes.rootDiv}>
        <Navbar />
        <Box className={classes.container}>
          <Box className={classes.banner}>
            <img
              src={require("../../assets/banner.jpg")}
              alt="About Us"
              className={classes.bannerImage}
            />
            <Text className={classes.bannerText}>About Us</Text>
          </Box>
          <Box className={classes.about}>
            <Heading className={classes.aboutHeading}>Who are we?</Heading>
            <Text className={classes.aboutText}>
              Mindleap AI is a forward-thinking LLC dedicated to developing
              innovative AI-based applications designed to enhance everyday
              living. Our flagship product, Vigour, exemplifies our commitment
              to leveraging advanced technology to promote health and wellness.
            </Text>
            <Text className={classes.aboutText}>
              Vigour is a comprehensive wellness app that utilizes metrics from
              your mobile camera, smart watch, and daily progress to create
              customized programs and routines tailored to your unique needs.
              With Vigour, personal trainers can monitor and guide their clients
              more effectively, providing real-time feedback and personalized
              support. Our mission is to bridge the gap between cutting-edge AI
              and personal wellness, offering tools that empower both
              individuals and professionals in the fitness industry to achieve
              their goals with greater precision and ease.
            </Text>
            <Text className={classes.aboutText}>
              Join us on our journey to transform the future of wellness through
              the power of AI.
            </Text>
          </Box>
          {/* <Center>
            <img
              src={require("../../assets/fitgirl.png")}
              alt="About Us"
              className={classes.mainImage}
            />
          </Center> */}

          <Flex className={classes.vision}>
            <Box className={classes.visionContainer}>
              <Heading className={classes.visionHead}>Our Vision</Heading>
              <Text className={classes.visionText}>
                At Mindleap AI, we envision a world where technology empowers
                individuals to achieve their wellness goals effortlessly. By
                integrating cutting-edge AI with personal health metrics, we aim
                to revolutionize the way people approach fitness and well-being.
                Our vision is to create a future where personalized health and
                wellness programs are accessible to everyone, fostering
                healthier lifestyles and enhancing the quality of life globally.
              </Text>
            </Box>
            <Center className={classes.visionImage}>
              <Heading className={classes.visionHead2}>Our Vision</Heading>
              <img
                src={require("../../assets/exercise.jpeg")}
                alt="About Us"
                className={classes.Image}
              />
            </Center>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
