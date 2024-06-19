import React, { useEffect } from "react";
import classes from "./Privacy&Terms.module.scss";
import { Box, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box className={classes.rootDiv}>
      <Box className={classes.headingContainer}>
        <Heading className={classes.heading}>Terms of Use</Heading>
        <Text className={classes.headingText}>
          <strong>Last updated May 16, 2024</strong>
        </Text>
      </Box>
      <Box className={classes.container}>
        <Heading className={classes.header}>Terms of Use</Heading>
        <Heading color="greenyellow" fontSize="1.5rem">
          AGREEMENT TO OUR LEGAL TERMS{" "}
        </Heading>
        <Text className={classes.textinfo}>
          We are __________ ("<strong>Company</strong>," "<strong>we</strong>,"
          "<strong>us</strong>," or "<strong>our</strong>").
        </Text>

        <Text className={classes.textinfo}>
          We operate the{" "}
          <a
            href="https://vigour-fit.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://vigour-fit.com
          </a>
          (the "<strong>Site</strong>"), the mobile application vigour (the ""),
          as well as any other related products and services that refer or link
          to these legal terms (the "<strong>Legal Terms</strong>")
          (collectively, the "<strong>Services</strong>").
        </Text>
        <Text>
          You can contact us by email at __________ or by mail to __________,
          __________, __________.
        </Text>
        <Text className={classes.textinfo}>
          These Legal Terms constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity ("
          <strong>you</strong>"), and __________, concerning your access to and
          use of the Services. You agree that by accessing the Services, you
          have read, understood, and agreed to be bound by all of these Legal
          Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE
          EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE
          USE IMMEDIATELY.
        </Text>
        <Text className={classes.textinfo}>
          Supplemental terms and conditions or documents that may be posted on
          the Services from time to time are hereby expressly incorporated
          herein by reference. We reserve the right, in our sole discretion, to
          make changes or modifications to these Legal Terms at any time and for
          any reason. We will alert you about any changes by updating the "Last
          updated" date of these Legal Terms, and you waive any right to receive
          specific notice of each such change. It is your responsibility to
          periodically review these Legal Terms to stay informed of updates. You
          will be subject to, and will be deemed to have been made aware of and
          to have accepted, the changes in any revised Legal Terms by your
          continued use of the Services after the date such revised Legal Terms
          are posted.
        </Text>
        <Text className={classes.textinfo}>
          The Services are intended for users who are at least 13 years of age.
          All users who are minors in the jurisdiction in which they reside
          (generally under the age of 18) must have the permission of, and be
          directly supervised by, their parent or guardian to use the Services.
          If you are a minor, you must have your parent or guardian read and
          agree to these Legal Terms prior to you using the Services.
        </Text>
        <Text className={classes.textinfo}>
          We recommend that you print a copy of these Legal Terms for your
          records.
        </Text>
        <Heading className={classes.title} id="toc">
          TABLE OF CONTENTS
        </Heading>
        <Text className={classes.toc1}>
          <a href="#1">1. OUR SERVICES</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#2">2. INTELLECTUAL PROPERTY RIGHTS</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#3">3. USER REPRESENTATIONS</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#4">4. USER REGISTRATION</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#5">5. PRODUCTS</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#6">6. PURCHASES AND PAYMENT</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#7">7. REFUNDS POLICY</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#8">8. PROHIBITED ACTIVITIES</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#9">9. USER GENERATED CONTRIBUTIONS</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#10">10. CONTRIBUTION LICENSE</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#11">11. MOBILE APPLICATION LICENSE</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#12">12. SERVICES MANAGEMENT</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#13">13. TERM AND TERMINATION</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#14">14. MODIFICATIONS AND INTERRUPTIONS</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#15">15. GOVERNING LAW</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#16">16. DISPUTE RESOLUTION</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#17">17. CORRECTIONS</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#18">18. DISCLAIMER</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#19">19. LIMITATIONS OF LIABILITY</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#20">20. INDEMNIFICATION</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#21">21. USER DATA</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#22">
            22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
          </a>
        </Text>
        <Text className={classes.toc}>
          <a href="#23">23. CALIFORNIA USERS AND RESIDENTS</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#24">24. MISCELLANEOUS</a>
        </Text>
        <Text className={classes.toc}>
          <a href="#25">25. CONTACT US</a>
        </Text>

        <Heading className={classes.title} id="1">
          1. OUR SERVICES{" "}
        </Heading>
        <Text>
          The information provided when using the Services is not intended for
          distribution to or use by any person or entity in any jurisdiction or
          country where such distribution or use would be contrary to law or
          regulation or which would subject us to any registration requirement
          within such jurisdiction or country. Accordingly, those persons who
          choose to access the Services from other locations do so on their own
          initiative and are solely responsible for compliance with local laws,
          if and to the extent local laws are applicable.{" "}
        </Text>
        <Heading className={classes.title} id="2">
          2. HOW DO WE PROCESS YOUR INFORMATION?
        </Heading>
        <Text>
          <strong>Our intellectual property</strong>
        </Text>
        <Text className={classes.textinfo}>
          We are the owner or the licensee of all intellectual property rights
          in our Services, including all source code, databases, functionality,
          software, website designs, audio, video, text, photographs, and
          graphics in the Services (collectively, the "Content"), as well as the
          trademarks, service marks, and logos contained therein (the "Marks").
        </Text>
        <Text className={classes.textinfo}>
          Our Content and Marks are protected by copyright and trademark laws
          (and various other intellectual property rights and unfair competition
          laws) and treaties in the United States and around the world.{" "}
        </Text>
        <Text className={classes.textinfo}>
          The Content and Marks are provided in or through the Services "AS IS"
          for your personal, non-commercial use or internal business purpose
          only.{" "}
        </Text>
        <Text className={classes.textinfo}>
          <strong>Your use of our Services</strong>
        </Text>
        <Text className={classes.textinfo}>
          Subject to your compliance with these Legal Terms, including the{" "}
          <a href="#8">"PROHIBITED ACTIVITIES"</a> section below, we grant you a
          non-exclusive, non-transferable, revocable license to:
        </Text>

        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              access the Services; and
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              download or print a copy of any portion of the Content to which
              you have properly gained access.
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          solely for your personal, non-commercial use or internal business
          purpose.
        </Text>
        <Text className={classes.textinfo}>
          Except as set out in this section or elsewhere in our Legal Terms, no
          part of the Services and no Content or Marks may be copied,
          reproduced, aggregated, republished, uploaded, posted, publicly
          displayed, encoded, translated, transmitted, distributed, sold,
          licensed, or otherwise exploited for any commercial purpose
          whatsoever, without our express prior written permission.
        </Text>
        <Text className={classes.textinfo}>
          If you wish to make any use of the Services, Content, or Marks other
          than as set out in this section or elsewhere in our Legal Terms,
          please address your request to: __________. If we ever grant you the
          permission to post, reproduce, or publicly display any part of our
          Services or Content, you must identify us as the owners or licensors
          of the Services, Content, or Marks and ensure that any copyright or
          proprietary notice appears or is visible on posting, reproducing, or
          displaying our Content.{" "}
        </Text>
        <Text className={classes.textinfo}>
          We reserve all rights not expressly granted to you in and to the
          Services, Content, and Marks.
        </Text>
        <Text className={classes.textinfo}>
          Any breach of these Intellectual Property Rights will constitute a
          material breach of our Legal Terms and your right to use our Services
          will terminate immediately.{" "}
        </Text>
        <Text className={classes.textinfo}>
          <strong>Your submissions</strong>
        </Text>
        <Text className={classes.textinfo}>
          Please review this section and the{" "}
          <a href="#8">"PROHIBITED ACTIVITIES"</a> section carefully prior to
          using our Services to understand the (a) rights you give us and (b)
          obligations you have when you post or upload any content through the
          Services.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Submissions:</strong> By directly sending us any question,
          comment, suggestion, idea, feedback, or other information about the
          Services ("Submissions"), you agree to assign to us all intellectual
          property rights in such Submission. You agree that we shall own this
          Submission and be entitled to its unrestricted use and dissemination
          for any lawful purpose, commercial or otherwise, without
          acknowledgment or compensation to you.
        </Text>
        <Text className={classes.textinfo}>
          <strong>You are responsible for what you post or upload:</strong> By
          sending us Submissions through any part of the Services you:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              confirm that you have read and agree with our{" "}
              <a href="#8">"PROHIBITED ACTIVITIES"</a> and will not post, send,
              publish, upload, or transmit through the Services any Submission
              that is illegal, harassing, hateful, harmful, defamatory, obscene,
              bullying, abusive, discriminatory, threatening to any person or
              group, sexually explicit, false, inaccurate, deceitful, or
              misleading;
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              to the extent permissible by applicable law, waive any and all
              moral rights to any such Submission;.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              warrant that any such Submission are original to you or that you
              have the necessary rights and licenses to submit such Submissions
              and that you have full authority to grant us the above-mentioned
              rights in relation to your Submissions; and{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              warrant and represent that your Submissions do not constitute
              confidential information.
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          You are solely responsible for your Submissions and you expressly
          agree to reimburse us for any and all losses that we may suffer
          because of your breach of (a) this section, (b) any third party’s
          intellectual property rights, or (c) applicable law.
        </Text>
        <Heading className={classes.title} id="3">
          3. USER REPRESENTATIONS{" "}
        </Heading>
        <Text>
          By using the Services, you represent and warrant that: (1) all
          registration information you submit will be true, accurate, current,
          and complete; (2) you will maintain the accuracy of such information
          and promptly update such registration information as necessary; (3)
          you have the legal capacity and you agree to comply with these Legal
          Terms; (4) you are not under the age of 13; (5) you are not a minor in
          the jurisdiction in which you reside, or if a minor, you have received
          parental permission to use the Services; (6) you will not access the
          Services through automated or non-human means, whether through a bot,
          script or otherwise; (7) you will not use the Services for any illegal
          or unauthorized purpose; and (8) your use of the Services will not
          violate any applicable law or regulation.
        </Text>
        <Text className={classes.textinfo}>
          If you provide any information that is untrue, inaccurate, not
          current, or incomplete, we have the right to suspend or terminate your
          account and refuse any and all current or future use of the Services
          (or any portion thereof).
        </Text>
        <Heading className={classes.title} id="4">
          4. USER REGISTRATION{" "}
        </Heading>
        <Text>
          You may be required to register to use the Services. You agree to keep
          your password confidential and will be responsible for all use of your
          account and password. We reserve the right to remove, reclaim, or
          change a username you select if we determine, in our sole discretion,
          that such username is inappropriate, obscene, or otherwise
          objectionable.
        </Text>
        <Heading className={classes.title} id="5">
          5. PRODUCTS
        </Heading>
        <Text>
          All products are subject to availability. We reserve the right to
          discontinue any products at any time for any reason. Prices for all
          products are subject to change.
        </Text>
        <Heading className={classes.title} id="6">
          6. PURCHASES AND PAYMENT{" "}
        </Heading>
        <Text>We accept the following forms of payment:</Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              Visa
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Mastercard
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              American Express
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Discover
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              PayPal
            </ListItem>
          </List>
        </Box>
        <Text className={classes.textinfo}>
          You agree to provide current, complete, and accurate purchase and
          account information for all purchases made via the Services. You
          further agree to promptly update account and payment information,
          including email address, payment method, and payment card expiration
          date, so that we can complete your transactions and contact you as
          needed. Sales tax will be added to the price of purchases as deemed
          required by us. We may change prices at any time. All payments shall
          be in US dollars.{" "}
        </Text>
        <Text className={classes.textinfo}>
          You agree to pay all charges at the prices then in effect for your
          purchases and any applicable shipping fees, and you authorize us to
          charge your chosen payment provider for any such amounts upon placing
          your order. We reserve the right to correct any errors or mistakes in
          pricing, even if we have already requested or received payment.{" "}
        </Text>
        <Text className={classes.textinfo}>
          We reserve the right to refuse any order placed through the Services.
          We may, in our sole discretion, limit or cancel quantities purchased
          per person, per household, or per order. These restrictions may
          include orders placed by or under the same customer account, the same
          payment method, and/or orders that use the same billing or shipping
          address. We reserve the right to limit or prohibit orders that, in our
          sole judgment, appear to be placed by dealers, resellers, or
          distributors.{" "}
        </Text>
        <Heading className={classes.title} id="7">
          7. REFUNDS POLICY
        </Heading>
        <Text>All sales are final and no refund will be issued.</Text>
        <Heading className={classes.title} id="8">
          8. PROHIBITED ACTIVITIES
        </Heading>
        <Text>
          You may not access or use the Services for any purpose other than that
          for which we make the Services available. The Services may not be used
          in connection with any commercial endeavors except those that are
          specifically endorsed or approved by us.
        </Text>
        <Text className={classes.textinfo}>
          As a user of the Services, you agree not to:
        </Text>
        <Box className={classes.textinfo}>
          <List spacing={3} ml="4%">
            <ListItem>
              <ListIcon as={BsDot} />
              Systematically retrieve data or other content from the Services to
              create or compile, directly or indirectly, a collection,
              compilation, database, or directory without written permission
              from us.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Trick, defraud, or mislead us and other users, especially in any
              attempt to learn sensitive account information such as user
              passwords.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Circumvent, disable, or otherwise interfere with security-related
              features of the Services, including features that prevent or
              restrict the use or copying of any Content or enforce limitations
              on the use of the Services and/or the Content contained therein.{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Disparage, tarnish, or otherwise harm, in our opinion, us and/or
              the Services.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Use any information obtained from the Services in order to harass,
              abuse, or harm another person.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Make improper use of our support services or submit false reports
              of abuse or misconduct.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Use the Services in a manner inconsistent with any applicable laws
              or regulations.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Engage in unauthorized framing of or linking to the Services.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Upload or transmit (or attempt to upload or to transmit) viruses,
              Trojan horses, or other material, including excessive use of
              capital letters and spamming (continuous posting of repetitive
              text), that interferes with any party’s uninterrupted use and
              enjoyment of the Services or modifies, impairs, disrupts, alters,
              or interferes with the use, features, functions, operation, or
              maintenance of the Services.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Engage in any automated use of the system, such as using scripts
              to send comments or messages, or using any data mining, robots, or
              similar data gathering and extraction tools.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Delete the copyright or other proprietary rights notice from any
              Content.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Attempt to impersonate another user or person or use the username
              of another user.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Upload or transmit (or attempt to upload or to transmit) any
              material that acts as a passive or active information collection
              or transmission mechanism, including without limitation, clear
              graphics interchange formats ("gifs"), 1×1 pixels, web bugs,
              cookies, or other similar devices (sometimes referred to as
              "spyware" or "passive collection mechanisms" or "pcms").
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Interfere with, disrupt, or create an undue burden on the Services
              or the networks or services connected to the Services.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Harass, annoy, intimidate, or threaten any of our employees or
              agents engaged in providing any portion of the Services to you.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Attempt to bypass any measures of the Services designed to prevent
              or restrict access to the Services, or any portion of the
              Services.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Copy or adapt the Services' software, including but not limited to
              Flash, PHP, HTML, JavaScript, or other code.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Except as permitted by applicable law, decipher, decompile,
              disassemble, or reverse engineer any of the software comprising or
              in any way making up a part of the Services.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Except as may be the result of standard search engine or Internet
              browser usage, use, launch, develop, or distribute any automated
              system, including without limitation, any spider, robot, cheat
              utility, scraper, or offline reader that accesses the Services, or
              use or launch any unauthorized script or other software.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Use a buying agent or purchasing agent to make purchases on the
              Services.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Make any unauthorized use of the Services, including collecting
              usernames and/or email addresses of users by electronic or other
              means for the purpose of sending unsolicited email, or creating
              user accounts by automated means or under false pretenses.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Use the Services as part of any effort to compete with us or
              otherwise use the Services and/or the Content for any
              revenue-generating endeavor or commercial enterprise.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Use the Services to advertise or offer to sell goods and services.
            </ListItem>
            <ListItem>
              <ListIcon as={BsDot} />
              Sell or otherwise transfer your profile.
            </ListItem>
          </List>
        </Box>
        <Heading className={classes.title} id="9">
          9. USER GENERATED CONTRIBUTIONS
        </Heading>
        <Text>
          The Services does not offer users to submit or post content. We may
          provide you with the opportunity to create, submit, post, display,
          transmit, perform, publish, distribute, or broadcast content and
          materials to us or on the Services, including but not limited to text,
          writings, video, audio, photographs, graphics, comments, suggestions,
          or personal information or other material (collectively,
          "Contributions"). Contributions may be viewable by other users of the
          Services and through third-party websites. When you create or make
          available any Contributions, you thereby represent and warrant that:
        </Text>

        <Heading className={classes.title} id="10">
          10. CONTRIBUTION LICENSE
        </Heading>
        <Text>
          You and Services agree that we may access, store, process, and use any
          information and personal data that you provide and your choices
          (including settings).
        </Text>

        <Text className={classes.textinfo}>
          By submitting suggestions or other feedback regarding the Services,
          you agree that we can use and share such feedback for any purpose
          without compensation to you.{" "}
        </Text>
        <Text className={classes.textinfo}>
          We do not assert any ownership over your Contributions. You retain
          full ownership of all of your Contributions and any intellectual
          property rights or other proprietary rights associated with your
          Contributions. We are not liable for any statements or representations
          in your Contributions provided by you in any area on the Services. You
          are solely responsible for your Contributions to the Services and you
          expressly agree to exonerate us from any and all responsibility and to
          refrain from any legal action against us regarding your Contributions.
        </Text>

        <Heading className={classes.title} id="11">
          11. MOBILE APPLICATION LICENSE
        </Heading>
        <Text>
          <strong>Use License</strong>
        </Text>
        <Text className={classes.textinfo}>
          If you access the Services via the App, then we grant you a revocable,
          non-exclusive, non-transferable, limited right to install and use the
          App on wireless electronic devices owned or controlled by you, and to
          access and use the App on such devices strictly in accordance with the
          terms and conditions of this mobile application license contained in
          these Legal Terms. You shall not: (1) except as permitted by
          applicable law, decompile, reverse engineer, disassemble, attempt to
          derive the source code of, or decrypt the App; (2) make any
          modification, adaptation, improvement, enhancement, translation, or
          derivative work from the App; (3) violate any applicable laws, rules,
          or regulations in connection with your access or use of the App; (4)
          remove, alter, or obscure any proprietary notice (including any notice
          of copyright or trademark) posted by us or the licensors of the App;
          (5) use the App for any revenue-generating endeavor, commercial
          enterprise, or other purpose for which it is not designed or intended;
          (6) make the App available over a network or other environment
          permitting access or use by multiple devices or users at the same
          time; (7) use the App for creating a product, service, or software
          that is, directly or indirectly, competitive with or in any way a
          substitute for the App; (8) use the App to send automated queries to
          any website or to send any unsolicited commercial email; or (9) use
          any proprietary information or any of our interfaces or our other
          intellectual property in the design, development, manufacture,
          licensing, or distribution of any applications, accessories, or
          devices for use with the App.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Apple and Android Devices</strong>
        </Text>
        <Text className={classes.textinfo}>
          The following terms apply when you use the App obtained from either
          the Apple Store or Google Play (each an "App Distributor") to access
          the Services: (1) the license granted to you for our App is limited to
          a non-transferable license to use the application on a device that
          utilizes the Apple iOS or Android operating systems, as applicable,
          and in accordance with the usage rules set forth in the applicable App
          Distributor’s terms of service; (2) we are responsible for providing
          any maintenance and support services with respect to the App as
          specified in the terms and conditions of this mobile application
          license contained in these Legal Terms or as otherwise required under
          applicable law, and you acknowledge that each App Distributor has no
          obligation whatsoever to furnish any maintenance and support services
          with respect to the App; (3) in the event of any failure of the App to
          conform to any applicable warranty, you may notify the applicable App
          Distributor, and the App Distributor, in accordance with its terms and
          policies, may refund the purchase price, if any, paid for the App, and
          to the maximum extent permitted by applicable law, the App Distributor
          will have no other warranty obligation whatsoever with respect to the
          App; (4) you represent and warrant that (i) you are not located in a
          country that is subject to a US government embargo, or that has been
          designated by the US government as a "terrorist supporting" country
          and (ii) you are not listed on any US government list of prohibited or
          restricted parties; (5) you must comply with applicable third-party
          terms of agreement when using the App, e.g., if you have a VoIP
          application, then you must not be in violation of their wireless data
          service agreement when using the App; and (6) you acknowledge and
          agree that the App Distributors are third-party beneficiaries of the
          terms and conditions in this mobile application license contained in
          these Legal Terms, and that each App Distributor will have the right
          (and will be deemed to have accepted the right) to enforce the terms
          and conditions in this mobile application license contained in these
          Legal Terms against you as a third-party beneficiary thereof.
        </Text>
        <Heading className={classes.title} id="12">
          12. SERVICES MANAGEMENT
        </Heading>
        <Text>
          We reserve the right, but not the obligation, to: (1) monitor the
          Services for violations of these Legal Terms; (2) take appropriate
          legal action against anyone who, in our sole discretion, violates the
          law or these Legal Terms, including without limitation, reporting such
          user to law enforcement authorities; (3) in our sole discretion and
          without limitation, refuse, restrict access to, limit the availability
          of, or disable (to the extent technologically feasible) any of your
          Contributions or any portion thereof; (4) in our sole discretion and
          without limitation, notice, or liability, to remove from the Services
          or otherwise disable all files and content that are excessive in size
          or are in any way burdensome to our systems; and (5) otherwise manage
          the Services in a manner designed to protect our rights and property
          and to facilitate the proper functioning of the Services.
        </Text>
        <Heading className={classes.title} id="13">
          13. TERM AND TERMINATION
        </Heading>
        <Text>
          These Legal Terms shall remain in full force and effect while you use
          the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL
          TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
          NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING
          BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO
          REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION,
          WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY
          APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
          PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT
          OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR
          SOLE DISCRETION.
        </Text>
        <Text className={classes.textinfo}>
          If we terminate or suspend your account for any reason, you are
          prohibited from registering and creating a new account under your
          name, a fake or borrowed name, or the name of any third party, even if
          you may be acting on behalf of the third party. In addition to
          terminating or suspending your account, we reserve the right to take
          appropriate legal action, including without limitation pursuing civil,
          criminal, and injunctive redress.
        </Text>
        <Heading className={classes.title} id="14">
          14. MODIFICATIONS AND INTERRUPTIONS
        </Heading>
        <Text>
          We reserve the right to change, modify, or remove the contents of the
          Services at any time or for any reason at our sole discretion without
          notice. However, we have no obligation to update any information on
          our Services. We will not be liable to you or any third party for any
          modification, price change, suspension, or discontinuance of the
          Services.
        </Text>
        <Text className={classes.textinfo}>
          We cannot guarantee the Services will be available at all times. We
          may experience hardware, software, or other problems or need to
          perform maintenance related to the Services, resulting in
          interruptions, delays, or errors. We reserve the right to change,
          revise, update, suspend, discontinue, or otherwise modify the Services
          at any time or for any reason without notice to you. You agree that we
          have no liability whatsoever for any loss, damage, or inconvenience
          caused by your inability to access or use the Services during any
          downtime or discontinuance of the Services. Nothing in these Legal
          Terms will be construed to obligate us to maintain and support the
          Services or to supply any corrections, updates, or releases in
          connection therewith.
        </Text>
        <Heading className={classes.title} id="15">
          15. GOVERNING LAW
        </Heading>
        <Text>
          These Legal Terms shall be governed by and defined following the laws
          of __________. __________ and yourself irrevocably consent that the
          courts of __________ shall have exclusive jurisdiction to resolve any
          dispute which may arise in connection with these Legal Terms.
        </Text>
        <Heading className={classes.title} id="16">
          16. DISPUTE RESOLUTION
        </Heading>
        <Text>
          <strong>Informal Negotiations</strong>
        </Text>
        <Text className={classes.textinfo}>
          To expedite resolution and control the cost of any dispute,
          controversy, or claim related to these Legal Terms (each a "Dispute"
          and collectively, the "Disputes") brought by either you or us
          (individually, a "Party" and collectively, the "Parties"), the Parties
          agree to first attempt to negotiate any Dispute (except those Disputes
          expressly provided below) informally for at least __________ days
          before initiating arbitration. Such informal negotiations commence
          upon written notice from one Party to the other Party.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Binding Arbitration</strong>
        </Text>
        <Text className={classes.textinfo}>
          Any dispute arising out of or in connection with these Legal Terms,
          including any question regarding its existence, validity, or
          termination, shall be referred to and finally resolved by the
          International Commercial Arbitration Court under the European
          Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according
          to the Rules of this ICAC, which, as a result of referring to it, is
          considered as the part of this clause. The number of arbitrators shall
          be __________. The seat, or legal place, or arbitration shall be
          __________. The language of the proceedings shall be __________. The
          governing law of these Legal Terms shall be substantive law of
          __________.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Restrictions</strong>
        </Text>
        <Text className={classes.textinfo}>
          The Parties agree that any arbitration shall be limited to the Dispute
          between the Parties individually. To the full extent permitted by law,
          (a) no arbitration shall be joined with any other proceeding; (b)
          there is no right or authority for any Dispute to be arbitrated on a
          class-action basis or to utilize class action procedures; and (c)
          there is no right or authority for any Dispute to be brought in a
          purported representative capacity on behalf of the general public or
          any other persons.
        </Text>
        <Text className={classes.textinfo}>
          <strong>Exceptions to Informal Negotiations and Arbitration</strong>
        </Text>
        <Text className={classes.textinfo}>
          The Parties agree that the following Disputes are not subject to the
          above provisions concerning informal negotiations binding arbitration:
          (a) any Disputes seeking to enforce or protect, or concerning the
          validity of, any of the intellectual property rights of a Party; (b)
          any Dispute related to, or arising from, allegations of theft, piracy,
          invasion of privacy, or unauthorized use; and (c) any claim for
          injunctive relief. If this provision is found to be illegal or
          unenforceable, then neither Party will elect to arbitrate any Dispute
          falling within that portion of this provision found to be illegal or
          unenforceable and such Dispute shall be decided by a court of
          competent jurisdiction within the courts listed for jurisdiction
          above, and the Parties agree to submit to the personal jurisdiction of
          that court.
        </Text>

        <Heading className={classes.title} id="17">
          17. CORRECTIONS
        </Heading>
        <Text>
          There may be information on the Services that contains typographical
          errors, inaccuracies, or omissions, including descriptions, pricing,
          availability, and various other information. We reserve the right to
          correct any errors, inaccuracies, or omissions and to change or update
          the information on the Services at any time, without prior notice.
        </Text>
        <Heading className={classes.title} id="18">
          18. DISCLAIMER
        </Heading>
        <Text>
          THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
          AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE
          FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS
          OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF,
          INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
          ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF
          ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL
          ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR
          INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY
          DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND
          USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
          SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR
          FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR
          CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS,
          VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR
          THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR
          OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF
          ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
          TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT
          WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT
          OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE
          SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE
          APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL
          NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
          TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR
          SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY
          MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND
          EXERCISE CAUTION WHERE APPROPRIATE.
        </Text>
        <Heading className={classes.title} id="19">
          19. LIMITATIONS OF LIABILITY
        </Heading>
        <Text>
          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
          TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
          EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
          PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR
          USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY
          OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED
          HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS
          OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER
          OF THE AMOUNT PAID, IF ANY, BY YOU TO US OR . CERTAIN US STATE LAWS
          AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES
          OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY
          TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT
          APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
        </Text>

        <Text className={classes.textinfo}></Text>
        <Heading className={classes.title} id="20">
          20. INDEMNIFICATION
        </Heading>
        <Text>
          You agree to defend, indemnify, and hold us harmless, including our
          subsidiaries, affiliates, and all of our respective officers, agents,
          partners, and employees, from and against any loss, damage, liability,
          claim, or demand, including reasonable attorneys’ fees and expenses,
          made by any third party due to or arising out of: (1) use of the
          Services; (2) breach of these Legal Terms; (3) any breach of your
          representations and warranties set forth in these Legal Terms; (4)
          your violation of the rights of a third party, including but not
          limited to intellectual property rights; or (5) any overt harmful act
          toward any other user of the Services with whom you connected via the
          Services. Notwithstanding the foregoing, we reserve the right, at your
          expense, to assume the exclusive defense and control of any matter for
          which you are required to indemnify us, and you agree to cooperate, at
          your expense, with our defense of such claims. We will use reasonable
          efforts to notify you of any such claim, action, or proceeding which
          is subject to this indemnification upon becoming aware of it.
        </Text>

        <Heading className={classes.title} id="21">
          21. USER DATA
        </Heading>
        <Text>
          We will maintain certain data that you transmit to the Services for
          the purpose of managing the performance of the Services, as well as
          data relating to your use of the Services. Although we perform regular
          routine backups of data, you are solely responsible for all data that
          you transmit or that relates to any activity you have undertaken using
          the Services. You agree that we shall have no liability to you for any
          loss or corruption of any such data, and you hereby waive any right of
          action against us arising from any such loss or corruption of such
          data.
        </Text>

        <Heading className={classes.title} id="22">
          22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
        </Heading>
        <Text>
          Visiting the Services, sending us emails, and completing online forms
          constitute electronic communications. You consent to receive
          electronic communications, and you agree that all agreements, notices,
          disclosures, and other communications we provide to you
          electronically, via email and on the Services, satisfy any legal
          requirement that such communication be in writing. YOU HEREBY AGREE TO
          THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER
          RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS
          OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You
          hereby waive any rights or requirements under any statutes,
          regulations, rules, ordinances, or other laws in any jurisdiction
          which require an original signature or delivery or retention of
          non-electronic records, or to payments or the granting of credits by
          any means other than electronic means.
        </Text>
        <Heading className={classes.title} id="23">
          23. CALIFORNIA USERS AND RESIDENTS
        </Heading>
        <Text>
          If any complaint with us is not satisfactorily resolved, you can
          contact the Complaint Assistance Unit of the Division of Consumer
          Services of the California Department of Consumer Affairs in writing
          at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834
          or by telephone at (800) 952-5210 or (916) 445-1254.
        </Text>
        <Heading className={classes.title} id="24">
          24. MISCELLANEOUS
        </Heading>
        <Text>
          These Legal Terms and any policies or operating rules posted by us on
          the Services or in respect to the Services constitute the entire
          agreement and understanding between you and us. Our failure to
          exercise or enforce any right or provision of these Legal Terms shall
          not operate as a waiver of such right or provision. These Legal Terms
          operate to the fullest extent permissible by law. We may assign any or
          all of our rights and obligations to others at any time. We shall not
          be responsible or liable for any loss, damage, delay, or failure to
          act caused by any cause beyond our reasonable control. If any
          provision or part of a provision of these Legal Terms is determined to
          be unlawful, void, or unenforceable, that provision or part of the
          provision is deemed severable from these Legal Terms and does not
          affect the validity and enforceability of any remaining provisions.
          There is no joint venture, partnership, employment or agency
          relationship created between you and us as a result of these Legal
          Terms or use of the Services. You agree that these Legal Terms will
          not be construed against us by virtue of having drafted them. You
          hereby waive any and all defenses you may have based on the electronic
          form of these Legal Terms and the lack of signing by the parties
          hereto to execute these Legal Terms.
        </Text>
        <Heading className={classes.title} id="25">
          25. CONTACT US
        </Heading>
        <Text>
          In order to resolve a complaint regarding the Services or to receive
          further information regarding use of the Services, please contact us
          at: __________.
        </Text>
      </Box>
    </Box>
  );
}
