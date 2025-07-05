import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function TermsOfService() {
  // Smooth scroll implementation
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            window.location.hash = targetId;
          }
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head title="Terms of Service" />
      
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-700 px-6 py-8">
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          <p className="mt-2 text-indigo-100">Last updated: July 03, 2025</p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 prose prose-indigo max-w-none">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700">
              We are <span className="font-bold">SkyPort Cargo</span> ("<strong>Company</strong>," "<strong>we</strong>," "<strong>us</strong>," "<strong>our</strong>"), 
              a company registered in <span className="font-bold">Tanzania</span> at <span className="font-bold">Lumumba & Mafia st.</span>, 
              <span className="font-bold"> skyportlogistics25@gmail.com</span>, <span className="font-bold">Dar es salaam</span>.
            </p>

            <p className="text-gray-700 mt-4">
              We operate the website{' '}
              <a href="https://skyportcargo.co.tz/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                https://skyportcargo.co.tz/
              </a>{' '}
              (the "<strong>Site</strong>"), as well as any other related products and services that refer or link to these legal terms 
              (the "<strong>Legal Terms</strong>") (collectively, the "<strong>Services</strong>").
            </p>

            <div className="bg-indigo-50 p-4 my-6 border-l-4 border-indigo-500 rounded-r">
              <p className="font-medium italic text-indigo-800">
                SkyPort Cargo – Your Trusted Global Logistics Partner<br />
                Bridging China, Tanzania & the World with Seamless Shipping Solutions
              </p>
            </div>

            <div className="bg-indigo-50 p-4 my-6 border-l-4 border-indigo-500 rounded-r">
              <p className="font-medium italic text-indigo-800">
                At SkyPort Cargo, we specialize in efficient, reliable, and cost-effective logistics services connecting China, 
                Tanzania, and global markets. Whether you're importing goods from Chinese manufacturers or exporting products 
                from Tanzania to international markets, we provide end-to-end supply chain solutions tailored to your business needs.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 my-6 border-l-4 border-yellow-400 rounded-r">
              <p className="text-gray-700">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity 
                ("<strong>you</strong>"), and <span className="font-bold">SkyPort Cargo</span>, concerning your access to and use of the Services. 
                You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. 
                <strong> IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES 
                AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <section className="mb-10 bg-gray-50 p-6 rounded-lg print:hidden">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { text: "1. Our Services", id: "our-services" },
                { text: "2. Intellectual Property Rights", id: "intellectual-property-rights" },
                 { text: "3. USER REPRESENTATIONS", id: "userreps" },
	      { text: "4. USER REGISTRATION", id: "userreg" },
	      { text: "5. SUBSCRIPTIONS", id: "subscriptions" },
	      { text: "6. PROHIBITED ACTIVITIES", id: "prohibited" },
	      { text: "7. USER GENERATED CONTRIBUTIONS", id: "ugc" },
	      { text: "8. CONTRIBUTION LICENSE", id: "license" },
	      { text: "9. GUIDELINES FOR REVIEWS", id: "reviews" },
	      { text: "10. THIRD-PARTY WEBSITES AND CONTENT", id: "thirdparty" },
	      { text: "11. SERVICES MANAGEMENT", id: "sitemanage" },
	      { text: "12. PRIVACY POLICY", id: "ppyes" },
	      { text: "13. TERM AND TERMINATION", id: "terms" },
	      { text: "14. MODIFICATIONS AND INTERRUPTIONS", id: "modifications" },
	      { text: "15. GOVERNING LAW", id: "law" },
	      { text: "16. DISPUTE RESOLUTION", id: "disputes" },
	      { text: "17. CORRECTIONS", id: "corrections" },
	      { text: "18. DISCLAIMER", id: "disclaimer" },
	      { text: "19. LIMITATIONS OF LIABILITY", id: "liability" },
	      { text: "20. INDEMNIFICATION", id: "indemnification" },
	      { text: "21. USER DATA", id: "userdata" },
	      { text: "22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES", id: "electronic" },
	      { text: "23. CALIFORNIA USERS AND RESIDENTS", id: "california"},
	      { text: "24. MISCELLANEOUS", id: "misc" },
                { text: "25. Contact Us", id: "contact-us" }
              ].map((item, index) => (
                <a 
                  key={index} 
                  href={`#${item.id}`}
                  className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                >
                  {item.text}
                </a>
              ))}
            </div>
          </section>

          {/* Our Services Section */}
          <section id="our-services" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">1. Our Services</h2>
            <div className="mt-6 space-y-4 text-gray-700">
              <p>
                The information provided when using the Services is not intended for distribution to or use by any person or entity 
                in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would 
                subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose 
                to access the Services from other locations do so on their own initiative and are solely responsible for compliance 
                with local laws, if and to the extent local laws are applicable.
              </p>
              <p>
                The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and 
                Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions 
                would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would 
                violate the Gramm-Leach-Bliley Act (GLBA).
              </p>
            </div>
          </section>

          {/* Intellectual Property Rights Section */}
          <section id="intellectual-property-rights" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">2. Intellectual Property Rights</h2>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Our intellectual property</h3>
                <div className="mt-4 space-y-4 text-gray-700">
                  <p>
                    We are the owner or the licensee of all intellectual property rights in our Services, including all source code, 
                    databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services 
                    (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
                  </p>
                  <p>
                    Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights 
                    and unfair competition laws) and treaties in the United States and around the world.
                  </p>
                  <p>
                    The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or 
                    internal business purpose only.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800">Your use of our Services</h3>
                <div className="mt-4 space-y-4 text-gray-700">
                  <p>
                    Subject to your compliance with these Legal Terms, including the{' '}
                    <a href="#prohibited-activities" className="text-indigo-600 hover:text-indigo-800">
                      "Prohibited Activities"
                    </a>{' '}
                    section below, we grant you a non-exclusive, non-transferable, revocable license to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>access the Services; and</li>
                    <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
                  </ul>
                  <p>solely for your personal, non-commercial use or internal business purpose.</p>
                </div>
              </div>
            </div>
          </section>

          {/* User Representations Section */}
	      <section id="userreps" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">3. USER REPRESENTATIONS</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>By using the Services, you represent and warrant that:</p>
	          <ol className="list-decimal pl-6 space-y-2">
	            <li>all registration information you submit will be true, accurate, current, and complete;</li>
	            <li>you will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
	            <li>you have the legal capacity and you agree to comply with these Legal Terms;</li>
	            <li>you are not under the age of 13;</li>
	            <li>you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services;</li>
	            <li>you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
	            <li>you will not use the Services for any illegal or unauthorized purpose; and</li>
	            <li>your use of the Services will not violate any applicable law or regulation.</li>
	          </ol>

	          <p>
	            If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right 
	            to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
	          </p>
	        </div>
	      </section>

	      {/* User Registration Section */}
	      <section id="userreg" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">4. USER REGISTRATION</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            You may be required to register to use the Services. You agree to keep your password confidential and 
	            will be responsible for all use of your account and password. We reserve the right to remove, reclaim, 
	            or change a username you select if we determine, in our sole discretion, that such username is inappropriate, 
	            obscene, or otherwise objectionable.
	          </p>
	        </div>
	      </section>

	      {/* Subscriptions Section */}
	      <section id="subscriptions" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">5. SUBSCRIPTIONS</h2>
	        
	        <div className="space-y-6">
	          <div>
	            <h3 className="text-xl font-semibold mb-3">Billing and Renewal</h3>
	            <div className="space-y-4 text-gray-700">
	              <p>
	                Your subscription will continue and automatically renew unless canceled. You consent to our charging 
	                your payment method on a recurring basis without requiring your prior approval for each recurring charge, 
	                until such time as you cancel the applicable order. The length of your billing cycle is monthly.
	              </p>
	            </div>
	          </div>

	          <div>
	            <h3 className="text-xl font-semibold mb-3">Cancellation</h3>
	            <div className="space-y-4 text-gray-700">
	              <p>
	                You can cancel your subscription at any time by contacting us using the contact information provided below. 
	                Your cancellation will take effect at the end of the current paid term. If you have any questions or are 
	                unsatisfied with our Services, please email us at{' '}
	                <span className="font-bold">skyportlogistics25@gmail.com</span>.
	              </p>
	            </div>
	          </div>

	          <div>
	            <h3 className="text-xl font-semibold mb-3">Fee Changes</h3>
	            <div className="space-y-4 text-gray-700">
	              <p>
	                We may, from time to time, make changes to the subscription fee and will communicate any price changes 
	                to you in accordance with applicable law.
	              </p>
	            </div>
	          </div>
	        </div>
	      </section>

	      {/* Prohibited Activities Section */}
	      <section id="prohibited" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">6. PROHIBITED ACTIVITIES</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            You may not access or use the Services for any purpose other than that for which we make the Services 
	            available. The Services may not be used in connection with any commercial endeavors except those that 
	            are specifically endorsed or approved by us.
	          </p>

	          <p>As a user of the Services, you agree not to:</p>

	          <ul className="list-disc pl-6 space-y-2">
	            <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
	            <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
	            <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
	            <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
	            <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
	            <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
	            <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
	          </ul>
	        </div>
	      </section>

	      {/* Prohibited Activities Continued */}
	      <section className="mb-4 text-gray-900 ">
	        <ul className="list-disc pl-6 space-y-2">
	          <li>Engage in unauthorized framing of or linking to the Services.</li>
	          <li>
	            Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, 
	            including excessive use of capital letters and spamming (continuous posting of repetitive text), 
	            that interferes with any party's uninterrupted use and enjoyment of the Services or modifies, 
	            impairs, disrupts, alters, or interferes with the use, features, functions, operation, or 
	            maintenance of the Services.
	          </li>
	          <li>
	            Engage in any automated use of the system, such as using scripts to send comments or messages, 
	            or using any data mining, robots, or similar data gathering and extraction tools.
	          </li>
	          <li>Delete the copyright or other proprietary rights notice from any Content.</li>
	          <li>Attempt to impersonate another user or person or use the username of another user.</li>
	          <li>
	            Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive 
	            or active information collection or transmission mechanism, including without limitation, clear 
	            graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices 
	            (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").
	          </li>
	          <li>
	            Interfere with, disrupt, or create an undue burden on the Services or the networks or services 
	            connected to the Services.
	          </li>
	          <li>
	            Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any 
	            portion of the Services to you.
	          </li>
	          <li>
	            Attempt to bypass any measures of the Services designed to prevent or restrict access to the 
	            Services, or any portion of the Services.
	          </li>
	          <li>
	            Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, 
	            or other code.
	          </li>
	          <li>
	            Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer 
	            any of the software comprising or in any way making up a part of the Services.
	          </li>
	          <li>
	            Except as may be the result of standard search engine or Internet browser usage, use, launch, 
	            develop, or distribute any automated system, including without limitation, any spider, robot, 
	            cheat utility, scraper, or offline reader that accesses the Services, or use or launch any 
	            unauthorized script or other software.
	          </li>
	          <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
	          <li>
	            Make any unauthorized use of the Services, including collecting usernames and/or email addresses 
	            of users by electronic or other means for the purpose of sending unsolicited email, or creating 
	            user accounts by automated means or under false pretenses.
	          </li>
	          <li>
	            Use the Services as part of any effort to compete with us or otherwise use the Services and/or 
	            the Content for any revenue-generating endeavor or commercial enterprise.
	          </li>
	          <li>Use the Services to advertise or offer to sell goods and services.</li>
	          <li>Sell or otherwise transfer your profile.</li>
	        </ul>
	      </section>

	      {/* User Generated Contributions */}
	      <section id="ugc" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">7. USER GENERATED CONTRIBUTIONS</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            The Services does not offer users to submit or post content.
	          </p>
	        </div>
	      </section>

	      {/* Contribution License */}
	      <section id="license" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">8. CONTRIBUTION LICENSE</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            You and Services agree that we may access, store, process, and use any information and personal 
	            data that you provide following the terms of the Privacy Policy and your choices (including settings).
	          </p>
	          <p>
	            By submitting suggestions or other feedback regarding the Services, you agree that we can use and 
	            share such feedback for any purpose without compensation to you.
	          </p>
	        </div>
	      </section>

	      {/* Guidelines for Reviews */}
	      <section id="reviews" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">9. GUIDELINES FOR REVIEWS</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            We may provide you areas on the Services to leave reviews or ratings. When posting a review, 
	            you must comply with the following criteria:
	          </p>
	          <ol className="list-decimal pl-6 space-y-2">
	            <li>you should have firsthand experience with the person/entity being reviewed;</li>
	            <li>your reviews should not contain offensive profanity, or abusive, racist, offensive, or hateful language;</li>
	            <li>your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability;</li>
	            <li>your reviews should not contain references to illegal activity;</li>
	            <li>you should not be affiliated with competitors if posting negative reviews;</li>
	            <li>you should not make any conclusions as to the legality of conduct;</li>
	            <li>you may not post any false or misleading statements; and</li>
	            <li>you may not organize a campaign encouraging others to post reviews, whether positive or negative.</li>
	          </ol>
	          <p>
	            We may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation 
	            to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate. 
	            Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any 
	            of our affiliates or partners. We do not assume liability for any review or for any claims, 
	            liabilities, or losses resulting from any review. By posting a review, you hereby grant to us a 
	            perpetual, non-exclusive, worldwide, royalty-free, fully paid, assignable, and sublicensable 
	            right and license to reproduce, modify, translate, transmit by any means, display, perform, 
	            and/or distribute all content relating to review.
	          </p>
	        </div>
	      </section>

	      {/* Third-Party Websites and Content */}
	      <section id="thirdparty" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">10. THIRD-PARTY WEBSITES AND CONTENT</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            The Services may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") 
	            as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, 
	            applications, software, and other content or items belonging to or originating from third parties 
	            ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, 
	            monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible 
	            for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, 
	            available through, or installed from the Services, including the content, accuracy, offensiveness, 
	            opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites 
	            or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any 
	            Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. 
	            If you decide to leave the Services and access the Third-Party Websites or to use or install any 
	            Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer 
	            govern. You should review the applicable terms and policies, including privacy and data gathering 
	            practices, of any website to which you navigate from the Services or relating to any applications 
	            you use or install from the Services. Any purchases you make through Third-Party Websites will be 
	            through other websites and from other companies, and we take no responsibility whatsoever in relation 
	            to such purchases which are exclusively between you and the applicable third party. You agree and 
	            acknowledge that we do not endorse the products or services offered on Third-Party Websites and you 
	            shall hold us blameless from any harm caused by your purchase of such products or services. 
	            Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you 
	            relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
	          </p>
	        </div>
	      </section>

	      {/* Services Management */}
	      <section id="sitemanage" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">11. SERVICES MANAGEMENT</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these 
	            Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates 
	            the law or these Legal Terms, including without limitation, reporting such user to law enforcement 
	            authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit 
	            the availability of, or disable (to the extent technologically feasible) any of your Contributions 
	            or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, 
	            to remove from the Services or otherwise disable all files and content that are excessive in size 
	            or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner 
	            designed to protect our rights and property and to facilitate the proper functioning of the Services.
	          </p>
	        </div>
	      </section>

	      {/* Privacy Policy */}
	      <section id="ppyes" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 mb-4">12. PRIVACY POLICY</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            We care about data privacy and security. Please review our Privacy Policy: 
	            <a href="https://skyportcargo.co.tz/policies" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
	              https://skyportcargo.co.tz/policies
	            </a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. 
	            Please be advised the Services are hosted in South Africa and Tanzania. If you access the Services 
	            from any other region of the world with laws or other requirements governing personal data collection, 
	            use, or disclosure that differ from applicable laws in South Africa and Tanzania, then through your 
	            continued use of the Services, you are transferring your data to South Africa and Tanzania, and you 
	            expressly consent to have your data transferred to and processed in South Africa and Tanzania.
	          </p>
	          <p>
	            Further, we do not knowingly accept, request, or solicit information from children or knowingly 
	            market to children. Therefore, in accordance with the U.S. Children's Online Privacy Protection Act, 
	            if we receive actual knowledge that anyone under the age of 13 has provided personal information 
	            to us without the requisite and verifiable parental consent, we will delete that information from 
	            the Services as quickly as is reasonably practical.
	          </p>
	        </div>
	      </section>

	      {/* Term and Termination */}
	      <section id="terms" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 mb-4">13. TERM AND TERMINATION</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING 
	            ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT 
	            NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), 
	            TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY 
	            REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR 
	            REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND 
	            ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
	          </p>
	          <p>
	            If we terminate or suspend your account for any reason, you are prohibited from registering and 
	            creating a new account under your name, a fake or borrowed name, or the name of any third party, 
	            even if you may be acting on behalf of the third party. In addition to terminating or suspending 
	            your account, we reserve the right to take appropriate legal action, including without limitation 
	            pursuing civil, criminal, and injunctive redress.
	          </p>
	        </div>
	      </section>

	      {/* Modifications and Interruptions */}
	      <section id="modifications" className="mb-8">
	        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 mb-4">14. MODIFICATIONS AND INTERRUPTIONS</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            We reserve the right to change, modify, or remove the contents of the Services at any time or for 
	            any reason at our sole discretion without notice. However, we have no obligation to update any 
	            information on our Services. We will not be liable to you or any third party for any modification, 
	            price change, suspension, or discontinuance of the Services.
	          </p>
	          <p>
	            We cannot guarantee the Services will be available at all times. We may experience hardware, software, 
	            or other problems or need to perform maintenance related to the Services, resulting in interruptions, 
	            delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise 
	            modify the Services at any time or for any reason without notice to you. You agree that we have no 
	            liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or 
	            use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms 
	            will be construed to obligate us to maintain and support the Services or to supply any corrections, 
	            updates, or releases in connection therewith.
	          </p>
	        </div>
	      </section>

	      {/* Governing Law */}
	      <section id="law" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">15. GOVERNING LAW</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            These Legal Terms shall be governed by and defined following the laws of Tanzania. SkyPort Cargo 
	            and yourself irrevocably consent that the courts of Tanzania shall have exclusive jurisdiction 
	            to resolve any dispute which may arise in connection with these Legal Terms.
	          </p>
	        </div>
	      </section>

	      {/* Dispute Resolution */}
	      <section id="disputes" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">16. DISPUTE RESOLUTION</h2>
	        <div className="space-y-6">
	          <div>
	            <h3 className="text-xl font-semibold mb-3">Informal Negotiations</h3>
	            <div className="space-y-4 text-gray-700">
	              <p>
	                To expedite resolution and control the cost of any dispute, controversy, or claim related to 
	                these Legal Terms (each a "Dispute" and collectively, the "Disputes") brought by either you 
	                or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first 
	                attempt to negotiate any Dispute (except those Disputes expressly provided below) informally 
	                for at least thirty (30) days before initiating arbitration. Such informal negotiations 
	                commence upon written notice from one Party to the other Party.
	              </p>
	            </div>
	          </div>

	          <div>
	            <h3 className="text-xl font-semibold mb-3">Binding Arbitration</h3>
	            <div className="space-y-4 text-gray-700">
	              <p>
	                Any dispute arising out of or in connection with these Legal Terms, including any question 
	                regarding its existence, validity, or termination, shall be referred to and finally resolved 
	                by the International Commercial Arbitration Court under the European Arbitration Chamber 
	                (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC, which, as a 
	                result of referring to it, is considered as the part of this clause. The number of arbitrators 
	                shall be three (3). The seat, or legal place, or arbitration shall be Dar es salaam, Tanzania. 
	                The language of the proceedings shall be English, Swahili. The governing law of these Legal 
	                Terms shall be substantive law of Tanzania.
	              </p>
	            </div>
	          </div>

	          <div>
	            <h3 className="text-xl font-semibold mb-3">Restrictions</h3>
	            <div className="space-y-4 text-gray-700">
	              <p>
	                The Parties agree that any arbitration shall be limited to the Dispute between the Parties 
	                individually. To the full extent permitted by law, (a) no arbitration shall be joined with 
	                any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated 
	                on a class-action basis or to utilize class action procedures; and (c) there is no right or 
	                authority for any Dispute to be brought in a purported representative capacity on behalf of 
	                the general public or any other persons.
	              </p>
	            </div>
	          </div>

	          <div>
	            <h3 className="text-xl font-semibold mb-3">Exceptions to Informal Negotiations and Arbitration</h3>
	            <div className="space-y-4 text-gray-700">
	              <p>
	                The Parties agree that the following Disputes are not subject to the above provisions concerning 
	                informal negotiations binding arbitration: (a) any Disputes seeking to enforce or protect, or 
	                concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute 
	                related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized 
	                use; and (c) any claim for injunctive relief. If this provision is found to be illegal or 
	                unenforceable, then neither Party will elect to arbitrate any Dispute falling within that 
	                portion of this provision found to be illegal or unenforceable and such Dispute shall be 
	                decided by a court of competent jurisdiction within the courts listed for jurisdiction above, 
	                and the Parties agree to submit to the personal jurisdiction of that court.
	              </p>
	            </div>
	          </div>
	        </div>
	      </section>

	      {/* Corrections */}
	      <section id="corrections" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">17. CORRECTIONS</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            There may be information on the Services that contains typographical errors, inaccuracies, or 
	            omissions, including descriptions, pricing, availability, and various other information. We 
	            reserve the right to correct any errors, inaccuracies, or omissions and to change or update 
	            the information on the Services at any time, without prior notice.
	          </p>
	        </div>
	      </section>

	      {/* Disclaimer */}
	      <section id="disclaimer" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">18. DISCLAIMER</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE 
	            SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL 
	            WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, 
	            WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
	            AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS 
	            OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE 
	            SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR 
	            INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE 
	            WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS 
	            TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL 
	            INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE 
	            SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR 
	            THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND 
	            MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT 
	            POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, 
	            GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD 
	            PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION 
	            FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE 
	            RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS 
	            OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, 
	            YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
	          </p>
	        </div>
	      </section>

	      {/* Limitations of Liability */}
	      <section id="liability" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">19. LIMITATIONS OF LIABILITY</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY 
	            FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, 
	            INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF 
	            THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
	          </p>
	        </div>
	      </section>

	      {/* Indemnification */}
	      <section id="indemnification" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">20. INDEMNIFICATION</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, 
	            and all of our respective officers, agents, partners, and employees, from and against any loss, 
	            damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by 
	            any third party due to or arising out of: (1) use of the Services; (2) breach of these Legal Terms; 
	            (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your 
	            violation of the rights of a third party, including but not limited to intellectual property rights; 
	            or (5) any overt harmful act toward any other user of the Services with whom you connected via 
	            the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the 
	            exclusive defense and control of any matter for which you are required to indemnify us, and you 
	            agree to cooperate, at your expense, with our defense of such claims. We will use reasonable 
	            efforts to notify you of any such claim, action, or proceeding which is subject to this 
	            indemnification upon becoming aware of it.
	          </p>
	        </div>
	      </section>

	      {/* User Data */}
	      <section id="userdata" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">21. USER DATA</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            We will maintain certain data that you transmit to the Services for the purpose of managing the 
	            performance of the Services, as well as data relating to your use of the Services. Although we 
	            perform regular routine backups of data, you are solely responsible for all data that you transmit 
	            or that relates to any activity you have undertaken using the Services. You agree that we shall 
	            have no liability to you for any loss or corruption of any such data, and you hereby waive any 
	            right of action against us arising from any such loss or corruption of such data.
	          </p>
	        </div>
	      </section>

	      {/* Electronic Communications */}
	      <section id="electronic" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            Visiting the Services, sending us emails, and completing online forms constitute electronic 
	            communications. You consent to receive electronic communications, and you agree that all agreements, 
	            notices, disclosures, and other communications we provide to you electronically, via email and on 
	            the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE 
	            TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC 
	            DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA 
	            THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, 
	            ordinances, or other laws in any jurisdiction which require an original signature or delivery or 
	            retention of non-electronic records, or to payments or the granting of credits by any means other 
	            than electronic means.
	          </p>
	        </div>
	      </section>

	      {/* California Users */}
	      <section id="california" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">23. CALIFORNIA USERS AND RESIDENTS</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance 
	            Unit of the Division of Consumer Services of the California Department of Consumer Affairs in 
	            writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone 
	            at (800) 952-5210 or (916) 445-1254.
	          </p>
	        </div>
	      </section>

	      {/* Miscellaneous */}
	      <section id="misc" className="mb-8">
	        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200">24. MISCELLANEOUS</h2>
	        <div className="space-y-4 text-gray-700">
	          <p>
	            These Legal Terms and any policies or operating rules posted by us on the Services or in respect 
	            to the Services constitute the entire agreement and understanding between you and us. Our failure 
	            to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver 
	            of such right or provision. These Legal Terms operate to the fullest extent permissible by law. 
	            We may assign any or all of our rights and obligations to others at any time. We shall not be 
	            responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond 
	            our reasonable control. If any provision or part of a provision of these Legal Terms is determined 
	            to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable 
	            from these Legal Terms and does not affect the validity and enforceability of any remaining 
	            provisions. There is no joint venture, partnership, employment or agency relationship created 
	            between you and us as a result of these Legal Terms or use of the Services. You agree that these 
	            Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive 
	            any and all defenses you may have based on the electronic form of these Legal Terms and the lack 
	            of signing by the parties hereto to execute these Legal Terms.
	          </p>
	        </div>
	      </section>

          {/* Contact Us Section */}
          <section id="contact-us" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">25. Contact Us</h2>
            <div className="mt-6 space-y-4 text-gray-700">
              <p>
                In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, 
                please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p><strong>SkyPort Cargo</strong></p>
                <p><strong>Lumumba & Mafia st.</strong></p>
                <p><strong>skyportlogistics25@gmail.com</strong></p>
                <p><strong>Dar es salaam</strong></p>
                <p><strong>Tanzania</strong></p>
                <p><strong>Phone: +255 794 341 226</strong></p>
                <p><strong>Email: skyportlogistics25@gmail.com</strong></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
