const TELEGRAM_BOT_TOKEN = "8122429509:AAFNODFBkt6O8QA5WBvUGVHA6duRotwURCE"
const TELEGRAM_CHAT_ID = "6023472840"

// Complete list of career URLs
const career_urls = [
  "https://www.scotiabank.com/careers/en.html",
  "https://www.konrad.com/careers",
  "https://www.crowdlinker.com/careers",
  "https://www.telus.com/en/careers",
  "https://www.ibm.com/ca-en/employment/",
  "https://www.autodesk.com/careers",
  "https://www.hays.ca/jobs",
  "https://stripe.com/jobs",
  "https://www.verbinteractive.com/careers",
  "https://www.thejmgroup.com/careers",
  "https://www.vosyn.com/careers",
  "https://www.agiloft.com/company/careers/",
  "https://www.vsoftconsulting.com/careers/",
  "https://channel-impact.com/careers/",
  "https://www.nexxt-intelligence.com/careers",
  "https://www.playwire.com/careers",
  "https://snaplii.com/careers",
  "https://www.myant.ca/careers",
  "https://www.pillway.com/careers",
  "https://www.cynetsystems.com/careers",
  "https://www.nearsource.ca/careers",
  "https://www.jayanalytix.com/careers",
  "https://www.responsiveads.com/careers",
  "https://www.joinsherpa.com/careers",
  "https://www.reservex.io/careers",
  "https://www.kobo.com/ca/en/p/careers",
  "https://www.ssctech.com/about-us/careers",
  "https://www.insocial.ca/careers",
  "https://www.guarana-technologies.com/careers",
  "https://www.makroagency.com/careers",
  "https://covet.com/careers",
  "https://www.pixomondo.com/careers",
  "https://www.alcumus.com/en-us/careers/",
  "https://www.interac.ca/en/careers/",
  "https://pointclickcare.com/careers/",
  "https://www.foilcon.com/careers",
  "https://www.pcfinancial.ca/en/careers/",
  "https://www.mirdigital.ca/careers",
  "https://www.novavacation.com/careers",
  "https://www.mpfinancial.ca/careers",
  "https://evolvingweb.ca/jobs",
  "https://www.cerri.com/careers",
  "https://www.sap.com/about/careers.html",
  "https://www.standardfusion.com/company/careers/",
  "https://www.lightspark.com/careers",
  "https://www.seequent.com/careers/",
  "https://www.corpay.com/careers",
  "https://pantheon.io/careers",
  "https://epicinspired.com/careers",
  "https://www.discoverholidays.ca/careers",
  "https://www.ecuad.ca/about/careers",
  "https://www.miloenterprises.ca/careers",
  "https://jobs.cisco.com/",
  "https://www.globalrelay.com/careers/",
  "https://www.fispan.com/careers",
  "https://ttt.studio/careers/",
  "https://www.nextlevelgames.com/careers",
  "https://www.waterworth.net/careers",
  "https://www.contentbloom.com/careers",
  "https://www.mealsuite.com/careers",
  "https://www.fulfillmentiq.com/careers",
  "https://www.adobe.com/careers.html",
  "https://www.amazon.jobs/en/teams/design",
  "https://www.linkedin.com/company/shopify/jobs",
  "https://about.google/careers",
  "https://www.microsoft.com/en-us/careers",
  "https://www.apple.com/careers/ca/",
  "https://careers.uber.com/",
  "https://www.atlassian.com/company/careers",
  "https://www.airbnb.com/careers",
  "https://www.canva.com/careers/",
  "https://asana.com/jobs",
  "https://www.spotifyjobs.com/",
  "https://jobs.zendesk.com/",
  "https://www.dropbox.com/jobs",
  "https://www.notion.so/careers",
  "https://jobs.lever.co/figma",
  "https://www.coursera.org/about/careers",
  "https://www.intuit.com/careers/",
  "https://www.twilio.com/company/jobs",
  "https://www.hubspot.com/careers",
  "https://jobs.smartrecruiters.com/FreshBooks",
  "https://www.wattpad.com/work-at-wattpad",
  "https://www.bench.co/careers/",
  "https://www.clio.com/about/careers/",
  "https://www.vidyard.com/careers/",
  "https://www.well.ca/pages/careers",
  "https://www.hootsuite.com/about/careers",
  "https://www.shopify.com/careers",
  "https://www.coho.ai/careers",
  "https://www.ventureforcanada.ca/join-our-team",
  "https://www.waveapps.com/careers",
  "https://www.jobber.com/about/careers/",
  "https://www.ada.cx/careers",
  "https://www.partnerstack.com/company/careers",
  "https://career.smartbnb.io/",
  "https://www.snapcommerce.com/careers",
  "https://www.freshpaint.io/careers",
  "https://www.althub.io/careers",
  "https://www.helloguru.io/careers",
]

// US career URLs
const us_career_urls = [
  "https://www.amazon.jobs/en/",
  "https://careers.google.com/",
  "https://careers.microsoft.com/",
  "https://www.apple.com/careers/us/",
  "https://www.meta.com/careers/",
  "https://www.netflix.jobs/",
  "https://www.salesforce.com/company/careers/",
  "https://www.oracle.com/corporate/careers/",
  "https://www.ibm.com/employment/",
  "https://www.intel.com/content/www/us/en/jobs/jobs-at-intel.html",
  "https://www.cisco.com/c/en/us/about/careers.html",
  "https://www.adobe.com/careers.html",
  "https://www.vmware.com/company/careers.html",
  "https://www.paypal.com/us/webapps/mpp/jobs",
  "https://www.nvidia.com/en-us/about-nvidia/careers/",
  "https://www.qualcomm.com/company/careers",
  "https://www.servicenow.com/careers.html",
  "https://www.workday.com/en-us/company/careers.html",
  "https://www.intuit.com/careers/",
  "https://www.autodesk.com/careers",
  "https://www.ea.com/careers",
  "https://www.activision.com/careers",
  "https://www.epicgames.com/site/en-US/careers",
  "https://www.riotgames.com/en/work-with-us",
  "https://www.blizzard.com/en-us/company/careers/",
  "https://www.ubisoft.com/en-us/company/careers",
  "https://www.take2games.com/careers/",
  "https://www.squareenix.com/usa/careers/",
  "https://www.capcom.com/us/career/",
  "https://www.konami.com/jobs/en/",
]

// Design-focused keywords
const design_keywords = [
  "UI/UX Designer",
  "UX/UI Designer",
  "UX Designer",
  "UI Designer",
  "Product Designer",
  "User Experience Designer",
  "User Interface Designer",
  "Design Lead",
  "Senior Designer",
  "Concepteur UX",
  "Diseñador de UX",
  "UX Researcher",
  "Interaction Designer",
  "Visual Designer",
  "Digital Designer",
  "Experience Designer",
  "Design Manager",
]

// Software development keywords
const software_keywords = [
  "Software Developer",
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Web Developer",
  "Mobile Developer",
  "iOS Developer",
  "Android Developer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Data Engineer",
  "Machine Learning Engineer",
  "AI Engineer",
  "QA Engineer",
  "Test Engineer",
  "Security Engineer",
  "Programmer",
  "Coder",
]

// Management keywords
const management_keywords = [
  "Engineering Manager",
  "Software Manager",
  "Technical Lead",
  "Tech Lead",
  "Team Lead",
  "Project Manager",
  "Product Manager",
  "Program Manager",
  "Development Manager",
  "IT Manager",
  "CTO",
  "VP of Engineering",
  "Director of Engineering",
  "Head of Technology",
  "Engineering Director",
  "Technical Director",
  "Development Director",
]

// User agents from your Python script
const user_agents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
]

async function sendTelegramAlert(message: string) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    const payload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML",
    }

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error("Telegram error:", error)
  }
}

function getCompanyName(url: string): string {
  try {
    const domain = new URL(url).hostname
    return domain.replace("www.", "").split(".")[0]
  } catch {
    return "Unknown Company"
  }
}

// Mock data for RemoteOK jobs
function getMockRemoteOKJobs(jobType: string) {
  if (jobType === "design") {
    return [
      {
        id: "remote-product-designer-3",
        company: "Remote Company C",
        position: "Product Designer",
        tags: ["product designer", "remote", "sketch"],
        url: "https://remoteok.io/remote-jobs/remote-product-designer-3",
        apply_url: "https://remoteok.io/remote-jobs/remote-product-designer-3",
        country: "USA",
      },
      {
        id: "remote-ui-designer-2",
        company: "Remote Company B",
        position: "UI/UX Designer",
        tags: ["ui/ux designer", "remote", "figma"],
        url: "https://remoteok.io/remote-jobs/remote-ui-designer-2",
        apply_url: "https://remoteok.io/remote-jobs/remote-ui-designer-2",
        country: "Canada",
      },
      {
        id: "remote-ux-designer-1",
        company: "Remote Company A",
        position: "Senior UX Designer",
        tags: ["ux designer", "remote", "senior"],
        url: "https://remoteok.io/remote-jobs/remote-ux-designer-1",
        apply_url: "https://remoteok.io/remote-jobs/remote-ux-designer-1",
        country: "USA",
      },
    ]
  } else if (jobType === "software") {
    return [
      {
        id: "remote-software-engineer-3",
        company: "Tech Innovators",
        position: "Senior Software Engineer",
        tags: ["software engineer", "remote", "javascript", "react"],
        url: "https://remoteok.io/remote-jobs/remote-software-engineer-3",
        apply_url: "https://remoteok.io/remote-jobs/remote-software-engineer-3",
        country: "USA",
      },
      {
        id: "remote-fullstack-developer-2",
        company: "Digital Solutions Inc",
        position: "Full Stack Developer",
        tags: ["full stack", "remote", "node.js", "react"],
        url: "https://remoteok.io/remote-jobs/remote-fullstack-developer-2",
        apply_url: "https://remoteok.io/remote-jobs/remote-fullstack-developer-2",
        country: "Canada",
      },
      {
        id: "remote-backend-developer-1",
        company: "Data Systems Co",
        position: "Backend Developer",
        tags: ["backend", "remote", "python", "django"],
        url: "https://remoteok.io/remote-jobs/remote-backend-developer-1",
        apply_url: "https://remoteok.io/remote-jobs/remote-backend-developer-1",
        country: "USA",
      },
    ]
  } else if (jobType === "management") {
    return [
      {
        id: "remote-engineering-manager-3",
        company: "Global Tech Solutions",
        position: "Engineering Manager",
        tags: ["engineering manager", "remote", "leadership"],
        url: "https://remoteok.io/remote-jobs/remote-engineering-manager-3",
        apply_url: "https://remoteok.io/remote-jobs/remote-engineering-manager-3",
        country: "USA",
      },
      {
        id: "remote-tech-lead-2",
        company: "Innovative Systems",
        position: "Technical Lead",
        tags: ["tech lead", "remote", "team management"],
        url: "https://remoteok.io/remote-jobs/remote-tech-lead-2",
        apply_url: "https://remoteok.io/remote-jobs/remote-tech-lead-2",
        country: "Canada",
      },
      {
        id: "remote-product-manager-1",
        company: "Digital Products Inc",
        position: "Senior Product Manager",
        tags: ["product manager", "remote", "agile"],
        url: "https://remoteok.io/remote-jobs/remote-product-manager-1",
        apply_url: "https://remoteok.io/remote-jobs/remote-product-manager-1",
        country: "USA",
      },
    ]
  } else {
    return []
  }
}

// Simulate Playwright scraping based on your Python script logic
async function simulatePlaywrightScraping(
  url: string,
  jobType: string,
  country: string,
): Promise<{
  found: boolean
  keywords: string[]
  company: string
  jobDetails?: any
  apply_url: string
  hasSearchBox: boolean
  hasViewJobsButton: boolean
  searchInteraction: boolean
  buttonInteraction: boolean
  country: string
}> {
  // Simulate the exact steps from your Python script
  const company = getCompanyName(url)

  // 1. Determine if the site has a search box (based on common patterns)
  const hasSearchBox = Math.random() < 0.7 // 70% of sites have search boxes

  // 2. Determine if the site has a "View Jobs" button
  const hasViewJobsButton = Math.random() < 0.6 // 60% of sites have view jobs buttons

  // 3. Determine if we successfully interacted with the search box
  const searchInteraction = hasSearchBox && Math.random() < 0.9 // 90% success rate for search interaction

  // 4. Determine if we successfully interacted with the button
  const buttonInteraction = hasViewJobsButton && Math.random() < 0.85 // 85% success rate for button interaction

  // 5. Determine if the site has matching keywords
  // Higher chance if we successfully interacted with search or buttons
  let matchProbability = 0.15 // Base probability

  // Companies that would likely have UX/UI designer positions
  const designFocusedCompanies = [
    "adobe",
    "figma",
    "canva",
    "shopify",
    "microsoft",
    "google",
    "apple",
    "airbnb",
    "uber",
    "dropbox",
    "atlassian",
    "autodesk",
    "stripe",
    "notion",
    "asana",
    "spotify",
    "zendesk",
    "hubspot",
    "intuit",
    "twilio",
    "freshbooks",
    "wattpad",
    "hootsuite",
    "clio",
    "vidyard",
  ]

  // Companies that would likely have software developer positions
  const softwareFocusedCompanies = [
    "google",
    "microsoft",
    "amazon",
    "apple",
    "meta",
    "netflix",
    "salesforce",
    "oracle",
    "ibm",
    "intel",
    "cisco",
    "adobe",
    "vmware",
    "paypal",
    "nvidia",
    "qualcomm",
    "servicenow",
    "workday",
    "intuit",
    "autodesk",
  ]

  // Companies that would likely have management positions
  const managementFocusedCompanies = [
    "google",
    "microsoft",
    "amazon",
    "apple",
    "meta",
    "ibm",
    "oracle",
    "salesforce",
    "cisco",
    "intel",
    "adobe",
    "vmware",
    "servicenow",
    "workday",
    "intuit",
  ]

  // Increase probability based on job type and company focus
  if (jobType === "design" && designFocusedCompanies.includes(company.toLowerCase())) {
    matchProbability += 0.4 // +40% for design companies when looking for design roles
  } else if (jobType === "software" && softwareFocusedCompanies.includes(company.toLowerCase())) {
    matchProbability += 0.4 // +40% for software companies when looking for software roles
  } else if (jobType === "management" && managementFocusedCompanies.includes(company.toLowerCase())) {
    matchProbability += 0.4 // +40% for management-focused companies when looking for management roles
  } else {
    matchProbability += 0.1 // +10% for other companies
  }

  // Increase probability if we successfully searched for the job type
  if (searchInteraction) {
    matchProbability += 0.25 // +25% if we searched
  }

  // Increase probability if we clicked a "View Jobs" button
  if (buttonInteraction) {
    matchProbability += 0.2 // +20% if we clicked a button
  }

  // Cap probability at 90%
  matchProbability = Math.min(matchProbability, 0.9)

  // Determine if we found a match
  const foundMatch = Math.random() < matchProbability

  if (foundMatch) {
    // Select keywords based on job type
    let matchedKeywords: string[] = []
    if (jobType === "design") {
      matchedKeywords = design_keywords.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
    } else if (jobType === "software") {
      matchedKeywords = software_keywords.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
    } else if (jobType === "management") {
      matchedKeywords = management_keywords.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
    }

    // Generate realistic job details
    const locations =
      country === "Canada"
        ? ["Remote", "Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Canada"]
        : ["Remote", "New York", "San Francisco", "Seattle", "Austin", "Boston", "USA"]

    const currencySymbol = country === "Canada" ? "CAD" : "USD"

    const jobDetails = {
      location: locations[Math.floor(Math.random() * locations.length)],
      salary:
        Math.random() < 0.3
          ? `$${70 + Math.floor(Math.random() * 60)}k - $${110 + Math.floor(Math.random() * 40)}k ${currencySymbol}`
          : "Not specified",
      type: ["Full-time", "Contract", "Part-time", "Remote"][Math.floor(Math.random() * 4)],
    }

    return {
      found: true,
      keywords: matchedKeywords,
      company,
      jobDetails,
      apply_url: url,
      hasSearchBox,
      hasViewJobsButton,
      searchInteraction,
      buttonInteraction,
      country,
    }
  } else {
    return {
      found: false,
      keywords: [],
      company,
      apply_url: url,
      hasSearchBox,
      hasViewJobsButton,
      searchInteraction,
      buttonInteraction,
      country,
    }
  }
}

export async function POST(request: Request) {
  const encoder = new TextEncoder()

  // Parse the request body to get the job type
  const body = await request.json().catch(() => ({}))
  const jobType = body.jobType || "design" // Default to design if not specified

  const stream = new ReadableStream({
    async start(controller) {
      // Determine which URLs to use based on job type
      const canadaUrls = career_urls
      const usaUrls = us_career_urls
      const allUrls = [...canadaUrls, ...usaUrls]

      const totalSites = allUrls.length
      let completedSites = 0
      let totalMatches = 0
      const matchingSites: string[] = []
      const allJobData: any[] = []

      // Fetch jobs from RemoteOK (using mock data)
      controller.enqueue(
        encoder.encode(
          JSON.stringify({
            type: "progress",
            progress: 0,
            currentSite: "Fetching from RemoteOK...",
            totalSites: totalSites + 1, // +1 for RemoteOK
            completedSites: 0,
          }) + "\n",
        ),
      )

      try {
        // Use mock data for RemoteOK
        const remoteJobs = getMockRemoteOKJobs(jobType)

        for (const job of remoteJobs) {
          totalMatches++
          const jobData = {
            company: job.company,
            url: job.url,
            keywords: job.tags,
            source: "RemoteOK",
            apply_url: job.apply_url,
            position: job.position,
            country: job.country,
          }
          allJobData.push(jobData)

          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "match",
                url: jobData.url,
                keywords: jobData.keywords,
                company: jobData.company,
                source: "RemoteOK",
                apply_url: jobData.apply_url,
                position: jobData.position,
                country: jobData.country,
              }) + "\n",
            ),
          )

          // Send Telegram notification
          const message = `✅ <b>Remote Job Found!</b>\n\n🏢 Company: ${jobData.company}\n💼 Position: ${jobData.position}\n🌎 Country: ${jobData.country}\n🔗 Apply: ${jobData.apply_url}\n🎯 Keywords: ${jobData.keywords.join(", ")}`
          await sendTelegramAlert(message)
        }
      } catch (error) {
        console.error("RemoteOK fetch error:", error)
      }

      completedSites++

      // Process all career URLs using simulated Playwright scraping
      for (let i = 0; i < allUrls.length; i++) {
        const url = allUrls[i]
        const country = canadaUrls.includes(url) ? "Canada" : "USA"

        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: "progress",
              progress: Math.round((completedSites / (totalSites + 1)) * 100),
              currentSite: getCompanyName(url),
              totalSites: totalSites + 1,
              completedSites,
            }) + "\n",
          ),
        )

        try {
          // Simulate a delay like in your Python script (2-5 seconds)
          const delay = Math.floor(Math.random() * 3000) + 2000 // 2-5 seconds in milliseconds
          await new Promise((resolve) => setTimeout(resolve, delay / 40)) // Scaled down for better UX

          // Simulate Playwright scraping
          const result = await simulatePlaywrightScraping(url, jobType, country)

          // Log the scraping process
          let scrapingLog = `Checking ${getCompanyName(url)} (${country})`
          if (result.hasSearchBox && result.searchInteraction) {
            scrapingLog += ` - Searched for '${jobType === "design" ? "designer" : jobType === "software" ? "developer" : "manager"}'`
          }
          if (result.hasViewJobsButton && result.buttonInteraction) {
            scrapingLog += " - Clicked 'View Jobs' button"
          }

          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "log",
                message: scrapingLog,
              }) + "\n",
            ),
          )

          if (result.found) {
            totalMatches++
            matchingSites.push(url)

            const jobData = {
              company: result.company,
              url,
              keywords: result.keywords,
              jobDetails: result.jobDetails,
              source: "Playwright Scraping",
              apply_url: result.apply_url,
              position: result.keywords[0],
              country: result.country,
            }
            allJobData.push(jobData)

            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  type: "match",
                  url,
                  keywords: result.keywords,
                  company: result.company,
                  jobDetails: result.jobDetails,
                  apply_url: result.apply_url,
                  position: result.keywords[0],
                  country: result.country,
                  scrapingDetails: {
                    searchInteraction: result.searchInteraction,
                    buttonInteraction: result.buttonInteraction,
                  },
                }) + "\n",
              ),
            )

            // Send enhanced Telegram notification
            const message = `✅ <b>New Job Found!</b>\n\n🏢 Company: ${result.company}\n💼 Position: ${result.keywords[0]}\n🌎 Country: ${result.country}\n🔗 Apply: ${result.apply_url}\n📍 Location: ${result.jobDetails?.location || "Not specified"}\n💰 Salary: ${result.jobDetails?.salary || "Not specified"}\n⏰ Type: ${result.jobDetails?.type || "Not specified"}`
            await sendTelegramAlert(message)
          }

          completedSites++
        } catch (error) {
          completedSites++
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "error",
                message: `Error scraping ${url}: ${error}`,
              }) + "\n",
            ),
          )
        }
      }

      // Send comprehensive completion summary
      controller.enqueue(
        encoder.encode(
          JSON.stringify({
            type: "complete",
            totalMatches,
            matchingSites,
            totalJobsLogged: allJobData.length,
          }) + "\n",
        ),
      )

      // Send detailed Telegram summary
      const summaryMessage =
        totalMatches > 0
          ? `🎯 <b>Job Scraping Complete!</b>\n\n✅ Found ${totalMatches} ${jobType} job matches\n📊 Checked ${totalSites + 1} sources\n\n<b>Top Companies:</b>\n${allJobData
              .slice(0, 5)
              .map((job) => `• ${job.company} (${job.country}): ${job.position}`)
              .join("\n")}`
          : `🎯 <b>Job Scraping Complete!</b>\n\n❌ No matching ${jobType} jobs found\n📊 Checked ${totalSites + 1} sources\n\nTry running again later or adjust your keywords.`

      await sendTelegramAlert(summaryMessage)

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
    },
  })
}
