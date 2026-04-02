import { useState, useRef, useEffect } from "react";

// ─── VERIFIED BUSINESS DATA ───
const BIZ = {
  phone: "(718) 668-3767", phoneRaw: "7186683767", email: "appliancesrruss@gmail.com",
  address: "231 Quintard St, Staten Island, NY 10305",
  mapsUrl: "https://www.google.com/maps/place/Appliances+R+Russ/@40.5917723,-74.0811757,17z",
  hours: "Mon–Fri: 10:00 AM – 4:00 PM", established: "2006", years: "19+",
  warranty: "1-Year Parts & Labor Warranty", payment: "Visa, Mastercard, Amex, Discover",
  areas: ["Staten Island", "Brooklyn", "Manhattan", "Jersey City"],
  links: {
    yelp: "https://www.yelp.com/biz/appliances-r-russ-staten-island",
    angi: "https://www.angi.com/companylist/us/ny/staten-island/appliance-r-russ-inc-reviews-317733.htm",
    google: "https://www.google.com/maps/place/Appliances+R+Russ/@40.5917723,-74.0811757,17z",
    bbb: "https://www.bbb.org/us/ny/staten-island/profile/appliance-repair/appliances-r-russ-inc-0121-106866",
    nextdoor: "https://nextdoor.com/pages/appliances-r-russ-staten-island-ny/",
  },
};
const PLAT = [
  { name: "Angi", rating: "5.0", count: "90", color: "#FF6153", url: BIZ.links.angi },
  { name: "Yelp", rating: "4.5", count: "62", color: "#D32323", url: BIZ.links.yelp },
  { name: "Google", rating: "4.5", count: "62", color: "#4285F4", url: BIZ.links.google },
  { name: "BBB", rating: "A+", count: "", color: "#005A78", url: BIZ.links.bbb },
];
const BR_P = ["Viking","Thermador","Wolf","Sub-Zero","Bosch","Dacor"];
const BR_S = ["Asko","DCS","Jennair","GE","Whirlpool","Maytag","Frigidaire","Amana"];

const SERVICES = [
  { name:"Ranges & Ovens", icon:"flame",
    desc:"Gas, electric, and dual-fuel range repair including igniters, control boards, burners, thermostat calibration, door hinges, and gaskets.",
    problems:["Oven not heating or heating unevenly","Gas burner won't ignite or keeps clicking","Control board error codes or display failure","Door won't close or seal properly","Temperature inaccurate or fluctuating"] },
  { name:"Refrigerators & Freezers", icon:"snow",
    desc:"Compressor replacement, thermostat repair, ice maker service, water line connections, and condenser cleaning. Sub-Zero specialists.",
    problems:["Not cooling or freezing properly","Ice maker not producing ice","Water leaking under or behind unit","Compressor running constantly","Unusual noise or vibration"] },
  { name:"Dishwashers", icon:"water",
    desc:"Leak diagnosis, drainage issues, motor and pump replacement, door latch repair, and spray arm service.",
    problems:["Not draining or standing water inside","Leaking from bottom or door","Not cleaning dishes properly","Door latch won't close or lock","Strange odor or mold buildup"] },
  { name:"Washers & Dryers", icon:"spin",
    desc:"Drum and spin issues, heating elements, drive belt replacement, valve repair, and ventilation service.",
    problems:["Won't spin, agitate, or start","Dryer not producing heat","Excessive vibration or banging","Water not filling or draining","Burning smell or overheating"] },
  { name:"Installations", icon:"wrench",
    desc:"Professional new appliance installation with code-compliant gas, electric, and plumbing connections.",
    problems:["New appliance delivery and hookup","Gas line connection and testing","Electrical outlet and circuit requirements","Water line installation for ice makers","Removal and disposal of old units"] },
  { name:"Used Appliances", icon:"tag",
    desc:"Quality inspected pre-owned appliances available for purchase, fully tested with warranty included.",
    problems:["Affordable replacement options","Fully inspected and tested units","Warranty included on all sales","Delivery available","Trade-in options for broken units"] },
];

const REVIEWS = [
  { name:"Kim B.", loc:"NYC", src:"Google", url:BIZ.links.google, text:"Russell was on time, professional and knowledgeable. He came to fix my Best Hood but was gracious to answer numerous questions about my dishwasher and washing machine. I highly recommend Appliances R Russ! And Vicky is super terrific too!" },
  { name:"Rachel B.", loc:"Yelp", src:"Yelp", url:BIZ.links.yelp, text:"Appliances R Russ to the rescue. I awoke with my Sub Zero freezer drawer frozen shut. After multiple awful experiences with other repair services, Russ was a breath of fresh air. Professional, knowledgeable, and fair." },
  { name:"Ilene G.", loc:"Yelp", src:"Yelp", url:BIZ.links.yelp, text:"Russ is the absolute best. I will only ever use him. He does an amazing job and the price is always right. I cannot recommend him highly enough. For stove, oven, or dishwasher repair — call Russ." },
  { name:"Josephine H.", loc:"Angi", src:"Angi", url:BIZ.links.angi, text:"Russ is a treasure. He tested and re-tested the igniter on my stove top. He adjusted the oven door and fixed my ice maker. How refreshing — someone who appears to like his job and wants to make people happy." },
  { name:"Verified Customer", loc:"Angi", src:"Angi", url:BIZ.links.angi, text:"Russ was super responsive and showed up exactly when he said he would. He had the right part for a somewhat obscure German washing machine. Russ charged $100 less than the first people I called." },
  { name:"Verified Customer", loc:"Google", src:"Google", url:BIZ.links.google, text:"Russ actually came 5 days earlier than expected just because he was close by. He fixed my washer in minutes because he had done detective work beforehand based on pictures I sent." },
  { name:"Verified Customer", loc:"Angi", src:"Angi", url:BIZ.links.angi, text:"Could not have gone better. The charge was one-eighth of what the other appliance repair firm estimated. One-eighth! I shall call Russ for any appliance repairs in full confidence." },
  { name:"Verified Customer", loc:"Yelp", src:"Yelp", url:BIZ.links.yelp, text:"I compared pricing between 3 places and hands down, Appliances R Russ were the least expensive and the fairest. The price was exactly what he quoted. No hidden fees. It restored my faith in repairmen." },
  { name:"Verified Customer", loc:"Angi", src:"Angi", url:BIZ.links.angi, text:"Russ is the kind of guy that puts you immediately at ease. Very friendly and likable. He charged less than the usual service fee. I have found my go-to guy for any further appliance needs." },
];

const FAQS = [
  { q:"How quickly can you come out?", a:"We typically schedule service within 1–3 business days, sometimes sooner depending on the area. Call us for same-day availability." },
  { q:"What brands do you service?", a:"We specialize in Viking, Thermador, Wolf, Sub-Zero, Bosch, and Dacor. We also service GE, Whirlpool, Maytag, Frigidaire, Jennair, Asko, DCS, and Amana." },
  { q:"Is there a service call fee?", a:"Yes, there is a standard diagnostic fee. If you choose to proceed with the repair, the fee is applied toward the total cost. Call for current pricing." },
  { q:"Do you offer a warranty on repairs?", a:"Every repair comes with a full 1-year parts and labor warranty. If the same issue comes back, we return at no additional charge." },
  { q:"What areas do you serve?", a:"We serve Staten Island, Brooklyn, Manhattan, and Jersey City. Call to confirm availability in your specific neighborhood." },
  { q:"What forms of payment do you accept?", a:"We accept Visa, Mastercard, American Express, and Discover. Payment is due at the time of service." },
];

const C = {
  red:"#B71C1C", redLight:"#E53935", redBg:"#FFF5F5", redSubtle:"#FFEBEE",
  gold:"#C9963B", goldLight:"#DDB04E",
  white:"#FFFFFF", offWhite:"#FAFAF8", cream:"#F5F3EF",
  text:"#1A1A1A", textMid:"#444", textLight:"#777", border:"#E5E0D8",
};

// ─── SVG ICONS ───
function Ic({type,size=20,color=C.textLight}){
  const d={
    star:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
    phone:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
    pin:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    clock:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
    shield:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
    check:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    flame:"M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z",
    snow:"M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z",
    water:"M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2C20 10.48 17.33 6.55 12 2z",
    spin:"M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z",
    wrench:"M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z",
    tag:"M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z",
    mail:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    ext:"M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z",
    chat:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z",
    help:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z",
    bolt:"M7 2v11h3v9l7-12h-4l4-8z",
    down:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z",
    up:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{flexShrink:0}}><path d={d[type]} fill={type==="star"?C.gold:color}/></svg>;
}
function Stars({size=15}){return <div style={{display:"flex",gap:1}}>{Array(5).fill(0).map((_,i)=><Ic key={i} type="star" size={size}/>)}</div>}

// ─── EMAIL ───
function sendEmail(data){
  const s=encodeURIComponent(`Service Request — ${data.name}`);
  const b=encodeURIComponent(`NEW SERVICE REQUEST\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email||"Not provided"}\nAddress: ${data.address||"Not provided"}\nBrand: ${data.brand||"Not specified"}\nAppliance: ${data.type||"Not specified"}\nPreferred Date: ${data.date||"Flexible"}\n\nIssue Description:\n${data.issue||"Not described"}\n\n---\nSubmitted from AppliancesRRuss.com`);
  window.open(`mailto:${BIZ.email}?subject=${s}&body=${b}`,"_blank");
}

// ─── AI CHAT ───
function ChatWidget(){
  const[open,setOpen]=useState(false);
  const[msgs,setMsgs]=useState([{role:"assistant",content:"Welcome to Appliances R Russ. Describe your appliance issue and I can help troubleshoot or get you scheduled for a service call."}]);
  const[input,setInput]=useState("");const[loading,setLoading]=useState(false);
  const[showForm,setShowForm]=useState(false);const[form,setForm]=useState({name:"",phone:"",appliance:"",issue:""});const[sent,setSent]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{ref.current&&(ref.current.scrollTop=ref.current.scrollHeight)},[msgs,loading]);
  const send=async()=>{
    if(!input.trim()||loading)return;
    const next=[...msgs,{role:"user",content:input.trim()}];setMsgs(next);setInput("");setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:`You are the service assistant for Appliances R Russ, premium appliance repair owned by Russell Dinsmore since 2006. A+ BBB, 5.0 on Angi (90 reviews). Brands: Viking, Thermador, Bosch, Wolf, Sub-Zero, Dacor, GE, Whirlpool, Jennair, Maytag, Frigidaire, Asko, DCS, Amana. Keep answers SHORT (2-3 sentences). Be professional. For gas leaks/sparking/burning — say turn off appliance and call immediately. Never guess prices. Guide toward booking. Hours: Mon-Fri 10AM-4PM. Phone: (718) 668-3767. Email: appliancesrruss@gmail.com. 1-year warranty. Service areas: Staten Island, Brooklyn, Manhattan, Jersey City.`,
          messages:next.filter((_,i)=>i>0).map(m=>({role:m.role,content:m.content}))})});
      const data=await res.json();
      const text=data.content?.map(b=>b.text||"").join("")||"Please call us at (718) 668-3767.";
      setMsgs(p=>[...p,{role:"assistant",content:text}]);
      if(/schedul|service call|appointment|book/i.test(text))setTimeout(()=>setShowForm(true),500);
    }catch{setMsgs(p=>[...p,{role:"assistant",content:"Having trouble connecting. Call (718) 668-3767 or email appliancesrruss@gmail.com."}]);}
    setLoading(false);
  };
  const submitChat=()=>{
    if(!form.name||!form.phone)return;
    const s=encodeURIComponent(`Chat Request — ${form.name}`);
    const b=encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nAppliance: ${form.appliance}\nIssue: ${form.issue}\n\nVia AI Chat`);
    window.open(`mailto:${BIZ.email}?subject=${s}&body=${b}`,"_blank");
    setSent(true);setShowForm(false);
    setMsgs(p=>[...p,{role:"assistant",content:`Thank you, ${form.name}. Your request has been sent. We'll call you at ${form.phone} to confirm.`}]);
  };
  if(!open)return<button onClick={()=>setOpen(true)} aria-label="Chat" style={{position:"fixed",bottom:20,right:20,zIndex:9999,width:56,height:56,borderRadius:"50%",border:"none",cursor:"pointer",background:C.red,boxShadow:"0 4px 16px rgba(183,28,28,.3)",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><Ic type="chat" size={24} color="#fff"/></button>;
  return(
    <div style={{position:"fixed",bottom:20,right:20,zIndex:9999,width:370,maxWidth:"calc(100vw - 24px)",height:490,borderRadius:14,overflow:"hidden",display:"flex",flexDirection:"column",background:"#fff",boxShadow:"0 12px 48px rgba(0,0,0,.18)",border:`1px solid ${C.border}`,fontFamily:"'Source Sans 3',sans-serif"}}>
      <div style={{padding:"12px 16px",background:C.red,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Libre Baskerville',serif",fontSize:14,color:"#fff",fontWeight:700}}>R</div>
          <div><div style={{color:"#fff",fontWeight:700,fontSize:13}}>Appliances R Russ</div><div style={{color:"#ffcdd2",fontSize:10}}>Service Assistant</div></div>
        </div>
        <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"#ffcdd2",fontSize:20,cursor:"pointer"}}>×</button>
      </div>
      <div ref={ref} style={{flex:1,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8,background:"#F9F9F7"}}>
        {msgs.map((m,i)=><div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"82%",padding:"10px 14px",borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",background:m.role==="user"?C.red:"#fff",color:m.role==="user"?"#fff":C.text,fontSize:13,lineHeight:1.55,boxShadow:m.role==="assistant"?"0 1px 3px rgba(0,0,0,.05)":"none"}}>{m.content}</div>)}
        {loading&&<div style={{alignSelf:"flex-start",padding:"10px 14px",borderRadius:12,background:"#fff",color:"#aaa",fontSize:13}}>...</div>}
        {showForm&&!sent&&(
          <div style={{alignSelf:"flex-start",maxWidth:"88%",padding:12,borderRadius:10,background:"#fff",border:`1px solid ${C.border}`}}>
            <div style={{fontWeight:700,fontSize:11,color:C.red,marginBottom:6,letterSpacing:.5}}>SERVICE REQUEST</div>
            {[{k:"name",p:"Name *"},{k:"phone",p:"Phone *"},{k:"appliance",p:"Appliance"},{k:"issue",p:"Issue"}].map(f=><input key={f.k} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} style={{width:"100%",padding:"7px 10px",marginBottom:4,borderRadius:5,border:`1px solid ${C.border}`,fontSize:12,outline:"none",boxSizing:"border-box"}}/>)}
            <button onClick={submitChat} style={{width:"100%",padding:8,borderRadius:5,border:"none",background:C.red,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer",marginTop:2}}>Submit & Email</button>
          </div>
        )}
      </div>
      <div style={{padding:10,borderTop:`1px solid ${C.border}`,display:"flex",gap:6}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Describe your issue..." style={{flex:1,padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,outline:"none"}}/>
        <button onClick={send} disabled={loading} style={{padding:"9px 14px",borderRadius:8,border:"none",background:C.red,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",opacity:loading?.5:1}}>Send</button>
      </div>
    </div>
  );
}

// ─── FAQ Accordion ───
function FaqItem({q,a}){
  const[open,setOpen]=useState(false);
  return(
    <div style={{borderBottom:`1px solid ${C.border}`}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",padding:"16px 0",display:"flex",justifyContent:"space-between",alignItems:"center",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
        <span style={{fontSize:14,fontWeight:600,color:C.text,paddingRight:12}}>{q}</span>
        <Ic type={open?"up":"down"} size={20} color={C.textLight}/>
      </button>
      {open&&<div style={{padding:"0 0 16px",fontSize:13,color:C.textMid,lineHeight:1.6}}>{a}</div>}
    </div>
  );
}

// ─── LAYOUT ───
function Sec({id,children,bg="transparent",pad="60px 24px"}){return<section id={id} style={{padding:pad,background:bg}}><div style={{maxWidth:920,margin:"0 auto"}}>{children}</div></section>}
function Hd({sub,children,light}){return<div style={{textAlign:"center",marginBottom:32}}>{sub&&<div style={{fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",color:light?C.goldLight:C.red,marginBottom:6}}>{sub}</div>}<h2 style={{fontFamily:"'Libre Baskerville',serif",fontSize:"clamp(23px,4vw,30px)",fontWeight:700,color:light?"#fff":C.text,margin:0,lineHeight:1.3}}>{children}</h2></div>}

// ─── MAIN ───
export default function Site(){
  const[rp,setRp]=useState(0);
  const[bf,setBf]=useState({name:"",phone:"",email:"",address:"",brand:"",type:"",date:"",issue:""});
  const[booked,setBooked]=useState(false);const[mn,setMn]=useState(false);const[expSvc,setExpSvc]=useState(null);
  const pp=3,tp=Math.ceil(REVIEWS.length/pp);
  const NAV=[{l:"About",h:"#about"},{l:"Services",h:"#services"},{l:"Brands",h:"#brands"},{l:"Reviews",h:"#reviews"},{l:"FAQ",h:"#faq"},{l:"Areas",h:"#areas"},{l:"Contact",h:"#contact"},{l:"Book Now",h:"#book"}];
  const handleBook=()=>{if(!bf.name||!bf.phone)return;sendEmail(bf);setBooked(true);};

  return(
    <div style={{fontFamily:"'Source Sans 3',sans-serif",color:C.text,background:C.white,minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::selection{background:${C.red}12}a{transition:opacity .2s}a:hover{opacity:.85}.ch{transition:transform .2s,box-shadow .2s}.ch:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.06)!important}@media(max-width:700px){.g2{grid-template-columns:1fr!important}.g3{grid-template-columns:1fr!important}.hf{flex-direction:column!important;text-align:center!important}.hf>*{align-items:center!important}.hcard{display:none!important}.dl{display:none!important}.mb{display:flex!important}}input:focus,textarea:focus{border-color:${C.gold}!important;outline:none}`}</style>

      {/* EMERGENCY BANNER */}
      <div style={{background:C.red,padding:"8px 24px",textAlign:"center"}}>
        <span style={{color:"#fff",fontSize:13,fontWeight:600}}>
          <Ic type="bolt" size={14} color={C.gold}/>{" "}
          Fast & Reliable Appliance Repair — Same-Week Service Available{" "}
          <a href={`tel:${BIZ.phoneRaw}`} style={{color:C.goldLight,textDecoration:"none",fontWeight:700,marginLeft:4}}>Call Now</a>
        </span>
      </div>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"#ffffffee",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`,padding:"0 24px"}}>
        <div style={{maxWidth:920,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",height:54}}>
          <a href="#" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
            <div style={{width:32,height:32,borderRadius:7,background:C.red,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:"'Libre Baskerville',serif",fontWeight:700,fontSize:16,color:C.gold}}>R</span></div>
            <div><div style={{fontFamily:"'Libre Baskerville',serif",fontWeight:700,fontSize:14,color:C.text,lineHeight:1.15}}>Appliances <span style={{color:C.gold}}>R</span> Russ</div><div style={{fontSize:9,color:C.textLight,letterSpacing:.5}}>Est. 2006 — Premium Appliance Repair</div></div>
          </a>
          <div className="dl" style={{display:"flex",alignItems:"center",gap:16}}>
            {NAV.map(n=><a key={n.l} href={n.h} style={{textDecoration:"none",fontSize:12.5,fontWeight:600,color:n.l==="Book Now"?"#fff":C.textMid,...(n.l==="Book Now"?{background:C.red,padding:"7px 14px",borderRadius:6}:{})}}>{n.l}</a>)}
          </div>
          <button className="mb" onClick={()=>setMn(!mn)} style={{display:"none",background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.text,alignItems:"center"}}>{mn?"×":"☰"}</button>
        </div>
        {mn&&<div style={{padding:"8px 0 14px",display:"flex",flexDirection:"column",gap:4,borderTop:`1px solid ${C.border}`}}>{NAV.map(n=><a key={n.l} href={n.h} onClick={()=>setMn(false)} style={{textDecoration:"none",fontSize:14,fontWeight:600,color:C.text,padding:"7px 0"}}>{n.l}</a>)}</div>}
      </nav>

      {/* HERO */}
      <section style={{padding:"44px 24px 40px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:920,margin:"0 auto"}}>
          <div className="hf" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:36}}>
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
              <div style={{display:"flex",gap:12,marginBottom:18,flexWrap:"wrap"}}>
                {PLAT.map(p=><a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:4,textDecoration:"none"}}><span style={{fontSize:11,fontWeight:700,color:p.color}}>{p.name}</span>{p.name!=="BBB"&&<Stars size={10}/>}<span style={{fontSize:11,fontWeight:700,color:C.text}}>{p.rating}</span>{p.count&&<span style={{fontSize:10,color:C.textLight}}>({p.count})</span>}</a>)}
              </div>
              <h1 style={{fontFamily:"'Libre Baskerville',serif",fontSize:"clamp(32px,5.5vw,46px)",fontWeight:700,color:C.text,lineHeight:1.12,marginBottom:12}}>Fast & Reliable<br/>Appliance <span style={{color:C.gold}}>Repair.</span></h1>
              <p style={{fontSize:15,color:C.textMid,lineHeight:1.65,marginBottom:22,maxWidth:440}}>Trusted since 2006. Premium brand specialists with honest pricing and every job backed by a 1-year parts & labor warranty.</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <a href="#book" style={{padding:"12px 22px",borderRadius:7,background:C.red,color:"#fff",fontWeight:700,fontSize:14,textDecoration:"none"}}>Book Service</a>
                <a href={`tel:${BIZ.phoneRaw}`} style={{padding:"12px 22px",borderRadius:7,border:`1.5px solid ${C.border}`,color:C.text,fontWeight:600,fontSize:14,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}><Ic type="phone" size={14} color={C.red}/>{BIZ.phone}</a>
                <a href={`mailto:${BIZ.email}`} style={{padding:"12px 22px",borderRadius:7,border:`1.5px solid ${C.border}`,color:C.text,fontWeight:600,fontSize:14,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}><Ic type="mail" size={14} color={C.red}/>Email Us</a>
              </div>
              <div style={{display:"flex",gap:22,marginTop:24}}>
                {[{v:"A+",l:"BBB Rating",url:BIZ.links.bbb},{v:"19+",l:"Years"},{v:"1 Yr",l:"Warranty"}].map((t,i)=>t.url?<a key={i} href={t.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",textAlign:"center"}}><div style={{fontFamily:"'Libre Baskerville',serif",fontSize:20,fontWeight:700,color:C.red}}>{t.v}</div><div style={{fontSize:10,color:C.textLight,fontWeight:600}}>{t.l}</div></a>:<div key={i} style={{textAlign:"center"}}><div style={{fontFamily:"'Libre Baskerville',serif",fontSize:20,fontWeight:700,color:C.red}}>{t.v}</div><div style={{fontSize:10,color:C.textLight,fontWeight:600}}>{t.l}</div></div>)}
              </div>
            </div>
            <div className="hcard" style={{width:250,flexShrink:0,padding:20,borderRadius:12,background:C.cream,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:11,fontWeight:700,color:C.red,letterSpacing:1.5,marginBottom:12}}>QUICK INFO</div>
              {[{icon:"clock",label:"Hours",value:"Mon–Fri 10AM–4PM"},{icon:"phone",label:"Phone",value:BIZ.phone,link:`tel:${BIZ.phoneRaw}`},{icon:"mail",label:"Email",value:BIZ.email,link:`mailto:${BIZ.email}`},{icon:"pin",label:"Location",value:"231 Quintard St\nStaten Island, NY 10305",link:BIZ.mapsUrl}].map((item,i)=>(
                <div key={i} style={{marginBottom:12,display:"flex",gap:8,alignItems:"flex-start"}}>
                  <Ic type={item.icon} size={15} color={C.red}/>
                  <div><div style={{fontSize:9,fontWeight:700,color:C.gold,letterSpacing:.8,textTransform:"uppercase",marginBottom:1}}>{item.label}</div>
                    {item.link?<a href={item.link} target={item.link.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{fontSize:12.5,color:C.textMid,textDecoration:"none",whiteSpace:"pre-line",lineHeight:1.4,display:"block"}}>{item.value}</a>
                    :<div style={{fontSize:12.5,color:C.textMid,whiteSpace:"pre-line",lineHeight:1.4}}>{item.value}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Sec id="about" bg={C.cream}>
        <Hd sub="Why Choose Us">Trusted by Homeowners Since 2006</Hd>
        <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[{ic:"shield",t:`${BIZ.years} Years Experience`,d:"Family-owned and operated by Russell Dinsmore. Built entirely on word-of-mouth referrals."},{ic:"star",t:"150+ Five-Star Reviews",d:"Top-rated across Angi, Yelp, Google, and Nextdoor with consistently excellent feedback."},{ic:"check",t:"1-Year Parts & Labor Warranty",d:"Every repair is guaranteed. If the same issue returns within a year, we come back free."},{ic:"tag",t:"Honest, Transparent Pricing",d:"The quoted price is the final price. No hidden fees, no surprise charges."}].map((w,i)=>(
            <div key={i} className="ch" style={{padding:18,borderRadius:10,background:"#fff",border:`1px solid ${C.border}`,display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:36,height:36,borderRadius:7,background:C.redSubtle,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic type={w.ic} size={17} color={C.red}/></div>
              <div><div style={{fontWeight:700,fontSize:14,color:C.text,marginBottom:3}}>{w.t}</div><div style={{fontSize:13,color:C.textLight,lineHeight:1.5}}>{w.d}</div></div>
            </div>
          ))}
        </div>
      </Sec>

      {/* SERVICES (expanded with common problems) */}
      <Sec id="services">
        <Hd sub="Our Services">What We Repair & Install</Hd>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {SERVICES.map((s,i)=>(
            <div key={i} style={{borderRadius:10,background:C.cream,border:`1px solid ${C.border}`,overflow:"hidden"}}>
              <button onClick={()=>setExpSvc(expSvc===i?null:i)} style={{width:"100%",padding:"16px 18px",display:"flex",alignItems:"center",gap:12,background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                <div style={{width:34,height:34,borderRadius:7,background:C.redSubtle,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic type={s.icon} size={17} color={C.red}/></div>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14,color:C.text}}>{s.name}</div><div style={{fontSize:12.5,color:C.textLight,marginTop:2}}>{s.desc}</div></div>
                <Ic type={expSvc===i?"up":"down"} size={18} color={C.textLight}/>
              </button>
              {expSvc===i&&(
                <div style={{padding:"0 18px 16px 64px"}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.red,letterSpacing:1,marginBottom:8}}>{i<4?"COMMON PROBLEMS WE FIX":"WHAT'S INCLUDED"}</div>
                  {s.problems.map((p,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><Ic type="check" size={14} color={C.gold}/><span style={{fontSize:13,color:C.textMid}}>{p}</span></div>)}
                  <a href="#book" style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:10,fontSize:13,fontWeight:700,color:C.red,textDecoration:"none"}}>Schedule Repair <Ic type="ext" size={12} color={C.red}/></a>
                </div>
              )}
            </div>
          ))}
        </div>
      </Sec>

      {/* BRANDS */}
      <Sec id="brands" bg={C.cream}>
        <Hd sub="Authorized & Factory-Trained">Brands We Service</Hd>
        <div style={{marginBottom:14}}><div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.red,textAlign:"center",marginBottom:8}}>PREMIUM BRANDS</div><div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>{BR_P.map(b=><div key={b} style={{padding:"9px 20px",borderRadius:6,background:C.red,color:"#fff",fontSize:13,fontWeight:700}}>{b}</div>)}</div></div>
        <div><div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:C.textLight,textAlign:"center",marginBottom:8,marginTop:8}}>ALSO SERVICING</div><div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>{BR_S.map(b=><div key={b} style={{padding:"8px 16px",borderRadius:6,background:"#fff",border:`1px solid ${C.border}`,color:C.textMid,fontSize:13,fontWeight:600}}>{b}</div>)}</div></div>
        <p style={{textAlign:"center",fontSize:13,color:C.textLight,marginTop:14}}>Authorized servicer for Viking. Factory-trained on all premium brands.</p>
      </Sec>

      {/* REVIEWS */}
      <Sec id="reviews">
        <Hd sub="Verified Customer Reviews">What People Are Saying</Hd>
        <div style={{display:"flex",justifyContent:"center",gap:28,marginBottom:28,flexWrap:"wrap"}}>
          {PLAT.filter(p=>p.count).map(p=><a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{textAlign:"center",textDecoration:"none"}}><div style={{fontFamily:"'Libre Baskerville',serif",fontSize:32,fontWeight:700,color:C.text}}>{p.rating}</div><Stars size={12}/><div style={{fontSize:11,fontWeight:700,color:p.color,marginTop:3}}>{p.name}</div><div style={{fontSize:10,color:C.textLight}}>{p.count} reviews</div></a>)}
          <a href={BIZ.links.bbb} target="_blank" rel="noopener noreferrer" style={{textAlign:"center",textDecoration:"none"}}><div style={{fontFamily:"'Libre Baskerville',serif",fontSize:32,fontWeight:700,color:C.text}}>A+</div><div style={{height:14}}/><div style={{fontSize:11,fontWeight:700,color:"#005A78",marginTop:3}}>BBB</div><div style={{fontSize:10,color:C.textLight}}>19 years</div></a>
        </div>
        <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {REVIEWS.slice(rp*pp,rp*pp+pp).map((r,i)=>(
            <div key={`${rp}-${i}`} className="ch" style={{padding:18,borderRadius:10,background:C.cream,border:`1px solid ${C.border}`,display:"flex",flexDirection:"column"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><Stars size={12}/><a href={r.url} target="_blank" rel="noopener noreferrer" style={{fontSize:10,fontWeight:700,color:C.textLight,letterSpacing:.5,textDecoration:"none",display:"flex",alignItems:"center",gap:3}}>{r.src}<Ic type="ext" size={9} color={C.textLight}/></a></div>
              <p style={{fontSize:13,color:C.textMid,lineHeight:1.6,flex:1,marginBottom:10}}>"{r.text}"</p>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,fontSize:12.5,color:C.text}}>{r.name}</div><div style={{fontSize:10,color:C.textLight}}>{r.loc}</div></div><div style={{fontSize:8,fontWeight:700,letterSpacing:.8,color:"#2E7D32",background:"#E8F5E9",padding:"3px 6px",borderRadius:3}}>VERIFIED</div></div>
            </div>
          ))}
        </div>
        {tp>1&&<div style={{display:"flex",justifyContent:"center",gap:6,marginTop:16}}>{Array.from({length:tp}).map((_,i)=><button key={i} onClick={()=>setRp(i)} style={{width:i===rp?22:10,height:10,borderRadius:5,border:"none",cursor:"pointer",background:i===rp?C.red:"#ddd",transition:"all .2s"}}/>)}</div>}
      </Sec>

      {/* FAQ */}
      <Sec id="faq" bg={C.cream}>
        <Hd sub="Common Questions">Frequently Asked Questions</Hd>
        <div style={{maxWidth:640,margin:"0 auto",background:"#fff",borderRadius:10,border:`1px solid ${C.border}`,padding:"4px 20px"}}>
          {FAQS.map((f,i)=><FaqItem key={i} q={f.q} a={f.a}/>)}
        </div>
      </Sec>

      {/* AREAS */}
      <Sec id="areas" pad="48px 24px">
        <Hd sub="Coverage">Service Area</Hd>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"}}>{BIZ.areas.map(a=><div key={a} style={{padding:"10px 20px",borderRadius:7,background:C.cream,border:`1px solid ${C.border}`,fontSize:14,fontWeight:600,color:C.text,display:"flex",alignItems:"center",gap:6}}><Ic type="pin" size={14} color={C.red}/>{a}</div>)}</div>
        <p style={{textAlign:"center",fontSize:13,color:C.textLight,marginTop:12}}>Same-week service available. <a href={BIZ.mapsUrl} target="_blank" rel="noopener noreferrer" style={{color:C.red,textDecoration:"none",fontWeight:600}}>View on Google Maps</a></p>
      </Sec>

      {/* CONTACT */}
      <Sec id="contact" bg={C.cream} pad="48px 24px">
        <Hd sub="Get in Touch">Contact Us</Hd>
        <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          <a href={`tel:${BIZ.phoneRaw}`} className="ch" style={{padding:20,borderRadius:10,background:"#fff",border:`1px solid ${C.border}`,textDecoration:"none",textAlign:"center",display:"block"}}><Ic type="phone" size={26} color={C.red}/><div style={{fontWeight:700,fontSize:14,color:C.text,marginTop:8,marginBottom:2}}>Call Us</div><div style={{fontSize:14,color:C.red,fontWeight:700}}>{BIZ.phone}</div></a>
          <a href={`mailto:${BIZ.email}`} className="ch" style={{padding:20,borderRadius:10,background:"#fff",border:`1px solid ${C.border}`,textDecoration:"none",textAlign:"center",display:"block"}}><Ic type="mail" size={26} color={C.red}/><div style={{fontWeight:700,fontSize:14,color:C.text,marginTop:8,marginBottom:2}}>Email Us</div><div style={{fontSize:12,color:C.red,fontWeight:600}}>{BIZ.email}</div></a>
          <a href={BIZ.mapsUrl} target="_blank" rel="noopener noreferrer" className="ch" style={{padding:20,borderRadius:10,background:"#fff",border:`1px solid ${C.border}`,textDecoration:"none",textAlign:"center",display:"block"}}><Ic type="pin" size={26} color={C.red}/><div style={{fontWeight:700,fontSize:14,color:C.text,marginTop:8,marginBottom:2}}>Visit Us</div><div style={{fontSize:12,color:C.red,fontWeight:600}}>231 Quintard St, SI 10305</div></a>
        </div>
      </Sec>

      {/* BOOKING */}
      <Sec id="book" bg={C.red} pad="52px 24px">
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <Hd sub="Schedule Service" light>Book a Service Call</Hd>
          <p style={{textAlign:"center",fontSize:13,color:"#ffcdd2",marginTop:-20,marginBottom:22}}>Fill out the form below. We'll confirm your appointment within 24 hours.</p>
          {booked?(
            <div style={{textAlign:"center",padding:30,borderRadius:12,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)"}}>
              <Ic type="check" size={38} color="#fff"/>
              <div style={{fontSize:17,fontWeight:700,color:"#fff",marginTop:8,marginBottom:4}}>Thank You! Request Sent.</div>
              <div style={{color:"#ffcdd2",fontSize:13,lineHeight:1.6}}>We've received your service request and will contact you shortly to confirm your appointment. You can also reach us at <a href={`tel:${BIZ.phoneRaw}`} style={{color:"#fff",textDecoration:"none",fontWeight:700}}>{BIZ.phone}</a>.</div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[{k:"name",p:"Full Name *",t:"text"},{k:"phone",p:"Phone Number *",t:"tel"},{k:"email",p:"Email (optional)",t:"email"},{k:"address",p:"Service Address *",t:"text"},{k:"brand",p:"Appliance Brand (e.g. Viking, Bosch)",t:"text"},{k:"type",p:"Appliance Type (e.g. Gas Range, Dishwasher)",t:"text"},{k:"date",p:"Preferred Date (e.g. Monday, ASAP)",t:"text"}].map(f=><input key={f.k} type={f.t} placeholder={f.p} value={bf[f.k]} onChange={e=>setBf(p=>({...p,[f.k]:e.target.value}))} style={{padding:"11px 14px",borderRadius:7,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",fontSize:13.5,outline:"none"}}/>)}
              <textarea placeholder="Describe the issue..." value={bf.issue} onChange={e=>setBf(p=>({...p,issue:e.target.value}))} rows={3} style={{padding:"11px 14px",borderRadius:7,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",fontSize:13.5,outline:"none",fontFamily:"inherit",resize:"vertical"}}/>
              <button onClick={handleBook} style={{padding:"13px",borderRadius:7,border:"2px solid #fff",background:"transparent",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color=C.red}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#fff"}}>Submit Service Request</button>
              <p style={{textAlign:"center",fontSize:12,color:"#ffcdd2"}}>Or call <a href={`tel:${BIZ.phoneRaw}`} style={{color:"#fff",textDecoration:"none",fontWeight:700}}>{BIZ.phone}</a> · <a href={`mailto:${BIZ.email}`} style={{color:"#fff",textDecoration:"none",fontWeight:700}}>Email us</a></p>
            </div>
          )}
        </div>
      </Sec>

      {/* FOOTER */}
      <footer style={{background:"#1A1A1A",padding:"36px 24px 24px"}}>
        <div style={{maxWidth:920,margin:"0 auto"}}>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,marginBottom:24}}>
            <div>
              <div style={{fontFamily:"'Libre Baskerville',serif",fontWeight:700,fontSize:15,color:"#fff",marginBottom:8}}>Appliances <span style={{color:C.gold}}>R</span> Russ</div>
              <p style={{fontSize:12.5,color:"#888",lineHeight:1.6}}>Family-owned appliance repair serving the New York metro area since 2006. Honest work, fair prices, guaranteed results.</p>
              <div style={{display:"flex",gap:8,marginTop:10}}>{PLAT.map(p=><a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{fontSize:10,fontWeight:700,color:"#888",textDecoration:"none",padding:"3px 7px",borderRadius:4,border:"1px solid #333"}}>{p.name}</a>)}</div>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:10,color:C.gold,letterSpacing:1.5,marginBottom:10}}>CONTACT</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                <a href={`tel:${BIZ.phoneRaw}`} style={{display:"flex",alignItems:"center",gap:6,color:"#aaa",textDecoration:"none",fontSize:12.5}}><Ic type="phone" size={12} color="#888"/>{BIZ.phone}</a>
                <a href={`mailto:${BIZ.email}`} style={{display:"flex",alignItems:"center",gap:6,color:"#aaa",textDecoration:"none",fontSize:12.5}}><Ic type="mail" size={12} color="#888"/>{BIZ.email}</a>
                <a href={BIZ.mapsUrl} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,color:"#aaa",textDecoration:"none",fontSize:12.5}}><Ic type="pin" size={12} color="#888"/>231 Quintard St, SI 10305</a>
                <div style={{display:"flex",alignItems:"center",gap:6,color:"#aaa",fontSize:12.5}}><Ic type="clock" size={12} color="#888"/>Mon–Fri 10AM–4PM</div>
              </div>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:10,color:C.gold,letterSpacing:1.5,marginBottom:10}}>NAVIGATION</div>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>{NAV.map(n=><a key={n.l} href={n.h} style={{fontSize:12.5,color:"#aaa",textDecoration:"none"}}>{n.l}</a>)}</div>
            </div>
          </div>
          <div style={{borderTop:"1px solid #333",paddingTop:14,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
            <div style={{fontSize:10,color:"#555"}}>© 2026 Appliances R. Russ, Inc.</div>
            <div style={{fontSize:10,color:"#555"}}>{BIZ.warranty} · {BIZ.payment}</div>
          </div>
        </div>
      </footer>

      <ChatWidget/>
    </div>
  );
}
