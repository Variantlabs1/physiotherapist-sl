import React, { useEffect } from "react";
import classes from "./Privacy&Terms.module.scss";
import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box className={classes.rootDiv}>
      <Box className={classes.headingContainer}>
        <Heading className={classes.heading}>Privacy Policy</Heading>
        <Text className={classes.headingText}>
          <strong>Last updated May 16, 2024</strong>
        </Text>
      </Box>
      <Box className={classes.container}>
        <Heading className={classes.header}>Privacy Policy</Heading>
        <Text>
          This privacy notice for Mindleap AI LLC ("<strong>we</strong>," "
          <strong>us</strong>," or "<strong>our</strong>"), describes how and
          why we might collect, store, use, and/or share ("
          <strong>process</strong>") your information when you use our services
          ("<strong>Services</strong>"), such as when you:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              Visit our website at{" "}
              <a
                href="https://vigour-fit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vigour-fit.com
              </a>
              , or any website of ours that links to this privacy notice
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Download and use our mobile application (vigour), or any other
              application of ours that links to this privacy notice
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Engage with us in other related ways, including any sales,
              marketing, or events
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          <strong>Questions or concerns? </strong>Reading this privacy notice
          will help you understand your privacy rights and choices. If you do
          not agree with our policies and practices, please do not use our
          Services. If you still have any questions or concerns, please contact
          us at contact@mindleap-ai.com.
        </Text>
        <Heading className={classes.title}>SUMMARY OF KEY POINTS</Heading>
        <Text>
          <strong>
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our{" "}
            <a href="#toc"> table of contents</a> below to find the section you
            are looking for.
          </strong>
        </Text>
        <Text className={classes.textinfo}>
          <strong>What personal information do we process? </strong>When you
          visit, use, or navigate our Services, we may process personal
          information depending on how you interact with us and the Services,
          the choices you make, and the products and features you use. Learn
          more about{" "}
          <a href="#personalinfo">personal information you disclose to us</a>.
        </Text>
        <Text className={classes.textinfo}>
          <stong>Do we process any sensitive personal information?</stong> We
          may process sensitive personal information when necessary with your
          consent or as otherwise permitted by applicable law. Learn more about{" "}
          <a href="#sensitiveinfo">sensitive information we process</a>.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Do we collect any information from third parties?</strong> We
          may collect information from public databases, marketing partners,
          social media platforms, and other outside sources. Learn more about
          <a href="#infocollected">information collected from other sources</a>.
        </Text>
        <Text className={classes.textinfo}>
          <strong>How do we process your information?</strong> We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply
          with law. We may also process your information for other purposes with
          your consent. We process your information only when we have a valid
          legal reason to do so. Learn more about{" "}
          <a href="#2">how we process your information</a>.
        </Text>
        <Text className={classes.textinfo}>
          <strong>
            In what situations and with which parties do we share personal
            information?
          </strong>{" "}
          We may share information in specific situations and with specific
          third parties. Learn more about{" "}
          <a href="#3">
            when and with whom we share your personal information.
          </a>
        </Text>
        <Text className={classes.textinfo}>
          <strong>How do we keep your information safe?</strong> We have
          organizational and technical processes and procedures in place to
          protect your personal information. However, no electronic transmission
          over the internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Learn more about{" "}
          <a href="#6">how we keep your information safe</a>.
        </Text>
        <Text className={classes.textinfo}>
          <strong>What are your rights? </strong>Depending on where you are
          located geographically, the applicable privacy law may mean you have
          certain rights regarding your personal information. Learn more about
          <a href="#8">your privacy rights</a>.
        </Text>
        <Text className={classes.textinfo}>
          <strong>How do you exercise your rights?</strong> The easiest way to
          exercise your rights is by submitting a data subject access request,
          or by contacting us. We will consider and act upon any request in
          accordance with applicable data protection laws.
        </Text>
        <Text className={classes.textinfo}>
          Want to learn more about what we do with any information we collect?{" "}
          <a href="#1">Review the privacy notice in full</a>.
        </Text>
        <Heading className={classes.title} id="toc">
          TABLE OF CONTENTS
        </Heading>
        <Text className={classes.toc1}>
          <a href="#1">1. WHAT INFORMATION DO WE COLLECT?</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#2">2. HOW DO WE PROCESS YOUR INFORMATION?</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#3">
            3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </a>
        </Text>
        <Text className={classes.toc}>
          <a href="#4">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#5">5. HOW LONG DO WE KEEP YOUR INFORMATION?</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#6">6. HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#7">7. DO WE COLLECT INFORMATION FROM MINORS?</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#8">8. WHAT ARE YOUR PRIVACY RIGHTS?</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#9">9. CONTROLS FOR DO-NOT-TRACK FEATURES</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#10">
            10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </a>
        </Text>
        <Text className={classes.toc}>
          <a href="#11">11. DO WE MAKE UPDATES TO THIS NOTICE?</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#12">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#13">
            13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
          </a>
        </Text>
        <Heading className={classes.title} id="1">
          1. WHAT INFORMATION DO WE COLLECT?
        </Heading>
        <Text id="personalinfo">
          <strong>Personal information you disclose to us</strong>
        </Text>
        <Text className={classes.textinfo}>
          <strong>In Short:</strong>
          <i> We collect personal information that you provide to us.</i>
        </Text>
        <Text className={classes.textinfo}>
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Personal Information Provided by You.</strong> The personal
          information that we collect depends on the context of your
          interactions with us and the Services, the choices you make, and the
          products and features you use. The personal information we collect may
          include the following:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              names
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              phone numbers
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              email addresses
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              mailing addresses
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              usernames
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              passwords
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              contact preferences
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              contact or authentication data
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              billing addresses
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              debit/credit card numbers
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo} id="sensitiveinfo">
          <strong>Sensitive Information</strong>. When necessary, with your
          consent or as otherwise permitted by applicable law, we process the
          following categories of sensitive information:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              health data
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          <strong>Payment Data.</strong>We may collect data necessary to process
          your payment if you choose to make purchases, such as your payment
          instrument number, and the security code associated with your payment
          instrument. All payment data is handled and stored by stripe and apple
          pay. You may find their privacy notice link(s) here:{" "}
          <a
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://stripe.com/privacy
          </a>{" "}
          and{" "}
          <a
            href="https://www.apple.com/legal/privacy/data/en/apple-pay/"
            rel="noopener noreferrer"
            target="_blank"
          >
            https://www.apple.com/legal/privacy/data/en/apple-pay/
          </a>
          .
        </Text>
        <Text className={classes.textinfo}>
          <strong>Application Data.</strong> If you use our application(s), we
          also may collect the following information if you choose to provide us
          with access or permission:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              Geolocation Information. We may request access or permission to
              track location-based information from your mobile device, either
              continuously or while you are using our mobile application(s), to
              provide certain location-based services. If you wish to change our
              access or permissions, you may do so in your device's settings.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Mobile Device Access. We may request access or permission to
              certain features from your mobile device, including your mobile
              device's bluetooth, camera, microphone, sensors, storage, and
              other features. If you wish to change our access or permissions,
              you may do so in your device's settings.{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Mobile Device Data. We automatically collect device information
              (such as your mobile device ID, model, and manufacturer),
              operating system, version information and system configuration
              information, device and application identification numbers,
              browser type and version, hardware model Internet service provider
              and/or mobile carrier, and Internet Protocol (IP) address (or
              proxy server). If you are using our application(s), we may also
              collect information about the phone network associated with your
              mobile device, your mobile device’s operating system or platform,
              the type of mobile device you use, your mobile device’s unique
              device ID, and information about the features of our
              application(s) you accessed.{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Push Notifications. We may request to send you push notifications
              regarding your account or certain features of the application(s).
              If you wish to opt out from receiving these types of
              communications, you may turn them off in your device's settings.{" "}
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          This information is primarily needed to maintain the security and
          operation of our application(s), for troubleshooting, and for our
          internal analytics and reporting purposes.
        </Text>
        <Text className={classes.textinfo}>
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </Text>
        <Text className={classes.textinfo}>
          Information automatically collected
        </Text>
        <Text className={classes.textinfo}>
          <strong>In Short: </strong>Some information — such as your Internet
          Protocol (IP) address and/or browser and device characteristics — is
          collected automatically when you visit our Services.
        </Text>
        <Text className={classes.textinfo}>
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
        </Text>
        <Text className={classes.textinfo}>
          Like many businesses, we also collect information through cookies and
          similar technologies.
        </Text>
        <Text className={classes.textinfo}>
          The information we collect includes:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              Log and Usage Data. Log and usage data is service-related,
              diagnostic, usage, and performance information our servers
              automatically collect when you access or use our Services and
              which we record in log files. Depending on how you interact with
              us, this log data may include your IP address, device information,
              browser type, and settings and information about your activity in
              the Services (such as the date/time stamps associated with your
              usage, pages and files viewed, searches, and other actions you
              take such as which features you use), device event information
              (such as system activity, error reports (sometimes called "crash
              dumps"), and hardware settings).
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Device Data. We collect device data such as information about your
              computer, phone, tablet, or other device you use to access the
              Services. Depending on the device used, this device data may
              include information such as your IP address (or proxy server),
              device and application identification numbers, location, browser
              type, hardware model, Internet service provider and/or mobile
              carrier, operating system, and system configuration information.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Location Data. We collect location data such as information about
              your device's location, which can be either precise or imprecise.
              How much information we collect depends on the type and settings
              of the device you use to access the Services. For example, we may
              use GPS and other technologies to collect geolocation data that
              tells us your current location (based on your IP address). You can
              opt out of allowing us to collect this information either by
              refusing access to the information or by disabling your Location
              setting on your device. However, if you choose to opt out, you may
              not be able to use certain aspects of the Services.
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo} id="infocollected">
          <strong>Information collected from other sources</strong>
        </Text>
        <Text className={classes.textinfo}>
          <strong>In Short:</strong> We may collect limited data from public
          databases, marketing partners, and other outside sources.
        </Text>
        <Text className={classes.textinfo}>
          In order to enhance our ability to provide relevant marketing, offers,
          and services to you and update our records, we may obtain information
          about you from other sources, such as public databases, joint
          marketing partners, affiliate programs, data providers, and from other
          third parties. This information includes mailing addresses, job
          titles, email addresses, phone numbers, intent data (or user behavior
          data), Internet Protocol (IP) addresses, social media profiles, social
          media URLs, and custom profiles, for purposes of targeted advertising
          and event promotion.
        </Text>
        <Heading className={classes.title} id="2">
          2. HOW DO WE PROCESS YOUR INFORMATION?
        </Heading>
        <Text>
          <strong>In Short: </strong>We process your information to provide,
          improve, and administer our Services, communicate with you, for
          security and fraud prevention, and to comply with law. We may also
          process your information for other purposes with your consent.
        </Text>
        <Text className={classes.textinfo}>
          <strong>
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </strong>
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>
                To facilitate account creation and authentication and otherwise
                manage user accounts.{" "}
              </strong>
              We may process your information so you can create and log in to
              your account, as well as keep your account in working order.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>
                To deliver and facilitate delivery of services to the user.
              </strong>{" "}
              We may process your information to provide you with the requested
              service.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>
                To respond to user inquiries/offer support to users.{" "}
              </strong>{" "}
              We may process your information to respond to your inquiries and
              solve any potential issues you might have with the requested
              service.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>To send administrative information to you.</strong> We may
              process your information to send you details about our products
              and services, changes to our terms and policies, and other similar
              information.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>To fulfill and manage your orders. </strong> We may
              process your information to fulfill and manage your orders,
              payments, returns, and exchanges made through the Services.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>To protect our Services.</strong> We may process your
              information as part of our efforts to keep our Services safe and
              secure, including fraud monitoring and prevention.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>
                To evaluate and improve our Services, products, marketing, and
                your experience.
              </strong>{" "}
              We may process your information when we believe it is necessary to
              identify usage trends, determine the effectiveness of our
              promotional campaigns, and to evaluate and improve our Services,
              products, marketing, and your experience.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>To identify usage trends. </strong> We may process
              information about how you use our Services to better understand
              how they are being used so we can improve them.
            </ListItem>
          </List>
        </Box>
        <Heading className={classes.title} id="3">
          3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </Heading>
        <Text>
          <strong>In Short: </strong> We may share information in specific
          situations described in this section and/or with the following third
          parties.
        </Text>
        <Text className={classes.textinfo}>
          We may need to share your personal information in the following
          situations:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Business Transfers.</strong> We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business to another company.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Affiliates. </strong> We may share your information with
              our affiliates, in which case we will require those affiliates to
              honor this privacy notice. Affiliates include our parent company
              and any subsidiaries, joint venture partners, or other companies
              that we control or that are under common control with us.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Business Partners. </strong> We may share your information
              with our business partners to offer you certain products,
              services, or promotions.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Offer Wall. </strong> Our application(s) may display a
              third-party hosted "offer wall." Such an offer wall allows
              third-party advertisers to offer virtual currency, gifts, or other
              items to users in return for the acceptance and completion of an
              advertisement offer. Such an offer wall may appear in our
              application(s) and be displayed to you based on certain data, such
              as your geographic area or demographic information. When you click
              on an offer wall, you will be brought to an external website
              belonging to other persons and will leave our application(s). A
              unique identifier, such as your user ID, will be shared with the
              offer wall provider in order to prevent fraud and properly credit
              your account with the relevant reward.
            </ListItem>
          </List>
        </Box>
        <Heading className={classes.title} id="4">
          4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </Heading>
        <Text>
          <strong>In Short: </strong>We may use cookies and other tracking
          technologies to collect and store your information.
        </Text>
        <Text className={classes.textinfo}>
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to gather information when you interact with our Services.
          Some online tracking technologies help us maintain the security of our
          Services and your account, prevent crashes, fix bugs, save your
          preferences, and assist with basic site functions.
        </Text>
        <Text className={classes.textinfo}>
          We also permit third parties and service providers to use online
          tracking technologies on our Services for analytics and advertising,
          including to help manage and display advertisements, to tailor
          advertisements to your interests, or to send abandoned shopping cart
          reminders (depending on your communication preferences). The third
          parties and service providers use their technology to provide
          advertising about products and services tailored to your interests
          which may appear either on our Services or on other websites.
        </Text>
        <Text className={classes.textinfo}>
          To the extent these online tracking technologies are deemed to be a
          "sale"/"sharing" (which includes targeted advertising, as defined
          under the applicable laws) under applicable US state laws, you can opt
          out of these online tracking technologies by submitting a request as
          described below under section{" "}
          <a href="#10">
            "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?"
          </a>
        </Text>
        <Text className={classes.textinfo}>
          Specific information about how we use such technologies and how you
          can refuse certain cookies is set out in our Cookie Notice.
        </Text>
        <Heading className={classes.title} id="5">
          5. HOW LONG DO WE KEEP YOUR INFORMATION?
        </Heading>
        <Text>
          <strong>In Short:</strong>We keep your information for as long as
          necessary to fulfill the purposes outlined in this privacy notice
          unless otherwise required by law.
        </Text>
        <Text className={classes.textinfo}>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us.
        </Text>
        <Text className={classes.textinfo}>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </Text>
        <Heading className={classes.title} id="6">
          6. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </Heading>
        <Text>
          <strong>In Short:</strong> We aim to protect your personal information
          through a system of organizational and technical security measures.
        </Text>
        <Text className={classes.textinfo}>
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </Text>
        <Heading className={classes.title} id="7">
          7. DO WE COLLECT INFORMATION FROM MINORS?
        </Heading>
        <Text>
          <strong>In Short:</strong> We do not knowingly collect data from or
          market to children under 18 years of age.
        </Text>
        <Text className={classes.textinfo}>
          We do not knowingly collect, solicit data from, or market to children
          under 18 years of age, nor do we knowingly sell such personal
          information. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent’s use of the Services. If we learn
          that personal information from users less than 18 years of age has
          been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at contact@vigour-fit.com.
        </Text>
        <Heading className={classes.title} id="8">
          8. WHAT ARE YOUR PRIVACY RIGHTS?
        </Heading>
        <Text>
          <strong>In Short:</strong>You may review, change, or terminate your
          account at any time, depending on your country, province, or state of
          residence.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Withdrawing your consent: </strong>If we are relying on your
          consent to process your personal information, which may be express
          and/or implied consent depending on the applicable law, you have the
          right to withdraw your consent at any time. You can withdraw your
          consent at any time by contacting us by using the contact details
          provided in the section{" "}
          <a href="#12">"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</a> below.
        </Text>
        <Text className={classes.textinfo}>
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.{" "}
        </Text>
        <Text className={classes.textinfo}>
          <strong>
            Opting out of marketing and promotional communications:{" "}
          </strong>
          You can unsubscribe from our marketing and promotional communications
          at any time by clicking on the unsubscribe link in the emails that we
          send, or by contacting us using the details provided in the section
          <a href="#12">"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</a> below.
          You will then be removed from the marketing lists. However, we may
          still communicate with you — for example, to send you service-related
          messages that are necessary for the administration and use of your
          account, to respond to service requests, or for other non-marketing
          purposes.
        </Text>
        <Text>
          <strong>Account Information</strong>
        </Text>
        <Text className={classes.textinfo}>
          If you would at any time like to review or change the information in
          your account or terminate your account, you can:
        </Text>
        <Box className={classes.textinfo}>
          <List>
            <ListItem>
              <ListIcon as={BsDot} />
              Log in to your account settings and update your user account.
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          legal terms and/or comply with applicable legal requirements.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Cookies and similar technologies: </strong> Most Web browsers
          are set to accept cookies by default. If you prefer, you can usually
          choose to set your browser to remove cookies and to reject cookies. If
          you choose to remove cookies or reject cookies, this could affect
          certain features or services of our Services.
        </Text>
        <Text className={classes.textinfo}>
          If you have questions or comments about your privacy rights, you may
          email us at contact@mindleap-ai.com.{" "}
        </Text>
        <Heading className={classes.title} id="9">
          9. CONTROLS FOR DO-NOT-TRACK FEATURES{" "}
        </Heading>
        <Text>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track ("DNT") feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. At this stage, no
          uniform technology standard for recognizing and implementing DNT
          signals has been finalized. As such, we do not currently respond to
          DNT browser signals or any other mechanism that automatically
          communicates your choice not to be tracked online. If a standard for
          online tracking is adopted that we must follow in the future, we will
          inform you about that practice in a revised version of this privacy
          notice.
        </Text>
        <Text className={classes.textinfo}>
          California law requires us to let you know how we respond to web
          browser DNT signals. Because there currently is not an industry or
          legal standard for recognizing or honoring DNT signals, we do not
          respond to them at this time.
        </Text>
        <Heading className={classes.title} id="10">
          10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </Heading>
        <Text>
          <strong>In Short:</strong> If you are a resident of California,
          Colorado, Connecticut, Utah or Virginia, you may have the right to
          request access to and receive details about the personal information
          we maintain about you and how we have processed it, correct
          inaccuracies, get a copy of, or delete your personal information. You
          may also have the right to withdraw your consent to our processing of
          your personal information. These rights may be limited in some
          circumstances by applicable law. More information is provided below.
        </Text>

        <Text className={classes.textinfo}>
          <strong>Categories of Personal Information We Collect</strong>
        </Text>
        <Text className={classes.textinfo}>
          We have collected the following categories of personal information in
          the past twelve (12) months:{" "}
        </Text>
        <Box className={classes.textinfo}>
          <Box className={classes.table}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>
                    <strong>Category</strong>
                  </Th>
                  <Th>
                    <strong>Examples</strong>
                  </Th>
                  <Th>
                    <strong>Collected</strong>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>A. Identifiers</Td>
                  <Td>
                    Contact details, such as real name, alias, postal address,
                    telephone or mobile contact number, unique personal
                    identifier, online identifier, Internet Protocol address,
                    email address, and account name
                  </Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>
                    B. Personal information as defined in the California
                    Customer Records statute
                  </Td>
                  <Td>
                    Name, contact information, education, employment, employment
                    history, and financial information
                  </Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>
                    C. Protected classification characteristics under state or
                    federal law
                  </Td>
                  <Td>
                    Gender, age, date of birth, race and ethnicity, national
                    origin, marital status, and other demographic data
                  </Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>D. Commercial information</Td>
                  <Td>
                    Transaction information, purchase history, financial
                    details, and payment information
                  </Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>E. Biometric information</Td>
                  <Td>Fingerprints and voiceprints</Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>F. Internet or other similar network activity</Td>
                  <Td>
                    Browsing history, search history, online behavior, interest
                    data, and interactions with our and other websites,
                    applications, systems, and advertisements
                  </Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>G. Geolocation data</Td>
                  <Td>Device location</Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>H. Audio, electronic, sensory, or similar information</Td>
                  <Td>
                    Images and audio, video or call recordings created in
                    connection with our business activities
                  </Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>I. Professional or employment-related information</Td>
                  <Td>
                    Business contact details in order to provide you our
                    Services at a business level or job title, work history, and
                    professional qualifications if you apply for a job with us
                  </Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>J. Education Information</Td>
                  <Td>Student records and directory information</Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>
                    K. Inferences drawn from collected personal information
                  </Td>
                  <Td>
                    Inferences drawn from any of the collected personal
                    information listed above to create a profile or summary
                    about, for example, an individual’s preferences and
                    characteristics
                  </Td>
                  <Td>NO</Td>
                </Tr>
                <Tr>
                  <Td>L. Sensitive personal Information</Td>
                  <Td>
                    Account login information, biometric data and health data
                  </Td>
                  <Td>YES</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
        <Text className={classes.textinfo}>
          We only collect sensitive personal information, as defined by
          applicable privacy laws or the purposes allowed by law or with your
          consent. Sensitive personal information may be used, or disclosed to a
          service provider or contractor, for additional, specified purposes.
          You may have the right to limit the use or disclosure of your
          sensitive personal information. We do not collect or process sensitive
          personal information for the purpose of inferring characteristics
          about you.
        </Text>
        <Text className={classes.textinfo}>
          We may also collect other personal information outside of these
          categories through instances where you interact with us in person,
          online, or by phone or mail in the context of:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} /> Receiving help through our customer
              support channels;
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} /> Participation in customer surveys or
              contests; and
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} /> Facilitation in the delivery of our
              Services and to respond to your inquiries.
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          We will use and retain the collected personal information as needed to
          provide the Services or for:
        </Text>
        <Box className={classes.textinfo}>
          <List ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              Category L - As long as the user has an account with us
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          <strong>Sources of Personal Information</strong>
        </Text>
        <Text className={classes.textinfo}>
          Learn more about the sources of personal information we collect in{" "}
          <a href="#1">"WHAT INFORMATION DO WE COLLECT?"</a>
        </Text>
        <Text className={classes.textinfo}>
          <strong>How We Use and Share Personal Information</strong>
        </Text>
        <Text className={classes.textinfo}>
          Learn about how we use your personal information in the section,
          <a href="#2">"HOW DO WE PROCESS YOUR INFORMATION?"</a>
        </Text>
        <Text className={classes.textinfo}>
          Will your information be shared with anyone else?
        </Text>
        <Text className={classes.textinfo}>
          We may disclose your personal information with our service providers
          pursuant to a written contract between us and each service provider.
          Learn more about how we disclose personal information to in the
          section,{" "}
          <a href="#3">
            "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?"
          </a>
        </Text>
        <Text className={classes.textinfo}>
          We may use your personal information for our own business purposes,
          such as for undertaking internal research for technological
          development and demonstration. This is not considered to be "selling"
          of your personal information.
        </Text>
        <Text className={classes.textinfo}>
          We have not disclosed, sold, or shared any personal information to
          third parties for a business or commercial purpose in the preceding
          twelve (12) months. We will not sell or share personal information in
          the future belonging to website visitors, users, and other consumers.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Your Rights</strong>
        </Text>
        <Text className={classes.textinfo}>
          You have rights under certain US state data protection laws. However,
          these rights are not absolute, and in certain cases, we may decline
          your request as permitted by law. These rights include:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Right to know</strong> whether or not we are processing
              your personal data
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Right to access</strong> your personal data
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Right to correct </strong>inaccuracies in your personal
              data
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Right to request </strong>the deletion of your personal
              data
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Right to obtain a copy </strong>of the personal data you
              previously shared with us
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Right to non-discrimination </strong>for exercising your
              rights
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              <strong>Right to opt out </strong> of the processing of your
              personal data if it is used for targeted advertising (or sharing
              as defined under California’s privacy law), the sale of personal
              data, or profiling in furtherance of decisions that produce legal
              or similarly significant effects ("profiling")
            </ListItem>
          </List>
        </Box>

        <Text className={classes.textinfo}>
          Depending upon the state where you live, you may also have the
          following rights:
        </Text>
        <Box className={classes.textinfo}>
          <List ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              Right to obtain a list of the categories of third parties to which
              we have disclosed personal data (as permitted by applicable law,
              including California's privacy law){" "}
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Right to limit use and disclosure of sensitive personal data (as
              permitted by applicable law, including California’s privacy law){" "}
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          <strong>How to Exercise Your Rights</strong>
        </Text>
        <Text className={classes.textinfo}>
          To exercise these rights, you can contact us by submitting a{" "}
          <a
            href="https://app.termly.io/notify/e5f1efd2-d28c-48d8-924e-b37c141bbcab"
            target="_blank"
            rel="noopener noreferrer"
          >
            data subject access request
          </a>
          , by emailing us at contact@vigour-fit.com, or by referring to the
          contact details at the bottom of this document.
        </Text>
        <Text className={classes.textinfo}>
          Under certain US state data protection laws, you can designate an
          authorized agent to make a request on your behalf. We may deny a
          request from an authorized agent that does not submit proof that they
          have been validly authorized to act on your behalf in accordance with
          applicable laws.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Request Verification</strong>
        </Text>
        <Text className={classes.textinfo}>
          Upon receiving your request, we will need to verify your identity to
          determine you are the same person about whom we have the information
          in our system. We will only use personal information provided in your
          request to verify your identity or authority to make the request.
          However, if we cannot verify your identity from the information
          already maintained by us, we may request that you provide additional
          information for the purposes of verifying your identity and for
          security or fraud-prevention purpose
        </Text>
        <Text className={classes.textinfo}>
          If you submit the request through an authorized agent, we may need to
          collect additional information to verify your identity before
          processing your request and the agent will need to provide a written
          and signed permission from you to submit such request on your behalf.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Appeals</strong>
        </Text>
        <Text className={classes.textinfo}>
          Under certain US state data protection laws, if we decline to take
          action regarding your request, you may appeal our decision by emailing
          us at contact@mindleap-ai.com. We will inform you in writing of any
          action taken or not taken in response to the appeal, including a
          written explanation of the reasons for the decisions. If your appeal
          is denied, you may submit a complaint to your state attorney general.
        </Text>
        <Text className={classes.textinfo}>
          <strong>California "Shine The Light" Law</strong>
        </Text>
        <Text className={classes.textinfo}>
          California Civil Code Section 1798.83, also known as the "Shine The
          Light" law, permits our users who are California residents to request
          and obtain from us, once a year and free of charge, information about
          categories of personal information (if any) we disclosed to third
          parties for direct marketing purposes and the names and addresses of
          all third parties with which we shared personal information in the
          immediately preceding calendar year. If you are a California resident
          and would like to make such a request, please submit your request in
          writing to us by using the contact details provided in the section{" "}
          <a href="#12">"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</a>
        </Text>
        <Heading className={classes.title} id="11">
          11. DO WE MAKE UPDATES TO THIS NOTICE?
        </Heading>
        <Text>
          <strong>In Short:</strong> Yes, we will update this notice as
          necessary to stay compliant with relevant laws.
        </Text>
        <Text className={classes.textinfo}>
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated "Revised" date at the top of
          this privacy notice. If we make material changes to this privacy
          notice, we may notify you either by prominently posting a notice of
          such changes or by directly sending you a notification. We encourage
          you to review this privacy notice frequently to be informed of how we
          are protecting your information.
        </Text>
        <Heading className={classes.title} id="12">
          12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?{" "}
        </Heading>
        <Text>
          If you have questions or comments about this notice, you may email us
          at contact@vigour-fit.com or contact us by post at:
        </Text>
        <Text className={classes.textinfo}>Mindleap AI LLC </Text>
        <Text>2261 augusta ave</Text>
        <Text>tracy, CA 95377</Text>
        <Text>United States</Text>
        <Heading className={classes.title} id="13">
          13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?{" "}
        </Heading>
        <Text>
          Based on the applicable laws of your country or state of residence in
          the US, you may have the right to request access to the personal
          information we collect from you, details about how we have processed
          it, correct inaccuracies, or delete your personal information. You may
          also have the right to withdraw your consent to our processing of your
          personal information. These rights may be limited in some
          circumstances by applicable law. To request to review, update, or
          delete your personal information, please fill out and submit a{" "}
          <a
            href="https://app.termly.io/notify/e5f1efd2-d28c-48d8-924e-b37c141bbcab"
            target="_blank"
            rel="noopener noreferrer"
          >
            data subject access request
          </a>
          .
        </Text>
      </Box>
    </Box>
  );
}
