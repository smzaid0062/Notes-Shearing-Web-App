Step 2: AI Verification Prompt

Send to AI API:

Subject: Operating System

Notes Content:
<extracted text>

Task:
Check if the content is mainly related to "Operating System".
Reply strictly in JSON:
{
  "match": true/false,
  "confidence": 0-100,
  "reason": "short reason"
}



-----------------------------------------------

Step 3: Backend Decision Logic
const text = await extractPDFText(file.path);
const aiResult = await verifyWithAI(subject, text);

if (aiResult.match && aiResult.confidence >= 60) {
   // upload to Cloudinary
   // save to DB
   res.json({ success: true, message: "Notes uploaded successfully"