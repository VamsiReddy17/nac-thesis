import React, { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Line, ComposedChart
} from "recharts";

// ─── PALETTE ────────────────────────────────────────
const P = {
  indigo: "#6366f1", indigoDk: "#4338ca", indigoLt: "#eef2ff",
  rose: "#f43f5e", roseDk: "#be123c", roseLt: "#fff1f2",
  emerald: "#10b981", emeraldDk: "#047857", emeraldLt: "#ecfdf5",
  amber: "#f59e0b", amberDk: "#92400e", amberLt: "#fffbeb",
  cyan: "#06b6d4", violet: "#8b5cf6", slate: "#64748b",
  bg: "#f8fafc", card: "#ffffff", border: "#e2e8f0",
  text: "#0f172a", textSec: "#475569", textMuted: "#94a3b8",
};
const CC = ["#6366f1","#f43f5e","#10b981","#f59e0b","#06b6d4","#8b5cf6","#ec4899","#84cc16","#a855f7","#14b8a6"];
const RCB_C = ["#10b981","#06b6d4","#f59e0b","#f43f5e"];
const RESP_C = ["#10b981","#34d399","#fbbf24","#f43f5e"];

// ─── DATA ───────────────────────────────────────────
const age = [{g:"<40 yrs",n:5,p:13.5},{g:"41-50 yrs",n:14,p:37.8},{g:"51-60 yrs",n:12,p:32.4},{g:"61-70 yrs",n:3,p:8.1},{g:">70 yrs",n:3,p:8.1}];
const lat = [{name:"Left",n:21,p:56.8},{name:"Right",n:16,p:43.2}];
const clin = [{f:"Mass",n:34,p:91.9},{f:"Mass + Palpable LN",n:1,p:2.7},{f:"Pain & Swelling",n:2,p:5.4}];
const diam = [{ph:"Pre-Chemo",mean:4.49,sd:2.19,min:1.4,max:11.5},{ph:"Post-Chemo",mean:2.19,sd:2.06,min:0.1,max:6.8}];
const diamH = [{n:"EP PR +ve",pre:3.586,post:2.657},{n:"ER+ve Her2+",pre:8.19,post:4.0},{n:"Her2 +ve",pre:4.886,post:1.663},{n:"PR +ve",pre:3.85,post:0.5},{n:"PR+ve Her2+",pre:7.1,post:2.35},{n:"TNBC",pre:4.85,post:3.588},{n:"TPBC",pre:3.7,post:1.2}];
const diamB = [{n:"Adenoid Cystic",pre:7.0,post:4.8},{n:"DCIS",pre:4.7,post:0.0},{n:"Inv. Ca. Breast",pre:3.988,post:1.881},{n:"Inv. Ca. Sq.",pre:11.5,post:4.7},{n:"Inv. Ductal Ca.",pre:5.16,post:1.9},{n:"Inv. Solid Pap.",pre:4.5,post:6.6}];
const hormone = [{n:"TPBC",v:9,p:24.3},{n:"Her2 +ve",v:8,p:21.6},{n:"TNBC",v:8,p:21.6},{n:"EP PR +ve",v:7,p:18.9},{n:"PR +ve",v:2,p:5.4},{n:"PR+ve Her2+",v:2,p:5.4},{n:"ER+ve Her2+",v:1,p:2.7}];
const biopsy = [{t:"Invasive Ca. of Breast",n:26,p:70.3},{t:"Invasive Ductal Ca.",n:5,p:13.5},{t:"Ductal Ca. In Situ",n:2,p:5.4},{t:"Inv. Solid Papillary Ca.",n:2,p:5.4},{t:"Adenoid Cystic Ca.",n:1,p:2.7},{t:"Inv. Ca. Sq. Diff.",n:1,p:2.7}];
const resp = [{name:"Complete",n:11,p:29.7},{name:"Partial",n:16,p:43.2},{name:"Stable",n:7,p:18.9},{name:"Progressive",n:3,p:8.1}];
const rcb = [{name:"Class 0 (pCR)",n:12,p:32.4},{name:"Class I",n:7,p:18.9},{name:"Class II",n:13,p:35.1},{name:"Class III",n:5,p:13.5}];
const nodal = [{ph:"Pre-Chemo",pos:28,neg:9},{ph:"Post-Chemo",pos:12,neg:25}];
const tnmPre = [{s:"CT4BN2M0",n:6},{s:"CT3N1M0",n:4},{s:"CT2N0M0",n:3},{s:"CT2N1",n:3},{s:"CT2N1M0",n:3},{s:"CT2N0",n:2},{s:"CT3N0M0",n:2},{s:"CT4BN0",n:2},{s:"CT4BN0M0",n:2},{s:"Others (9)",n:9}];
const tnmPost = [{s:"YPT0N0",n:12},{s:"YPT1AN0",n:3},{s:"YPT3N0",n:3},{s:"YPT0N1",n:2},{s:"YPT1A(4)N1A",n:2},{s:"YPT1CN0",n:2},{s:"YPT2N0",n:2},{s:"YPT2N1A",n:2},{s:"Others (9)",n:9}];

const allStats = [
  {t:"RCB Class × Clinical Response",chi:20.20,p:0.01,s:true},
  {t:"Clinical TNM × Biopsy Histology",chi:124.49,p:0.009,s:true},
  {t:"pCR × Clinical Response",chi:7.74,p:0.05,s:true},
  {t:"Biopsy × Clinical Response",chi:17.40,p:0.129,s:false},
  {t:"Age Group × RCB Class",chi:14.89,p:0.24,s:false},
  {t:"Age Group × Clinical Response",chi:13.82,p:0.31,s:false},
  {t:"Clinical TNM × RCB Class",chi:57.04,p:0.36,s:false},
  {t:"Hormone × Clinical Features",chi:11.83,p:0.45,s:false},
  {t:"Hormone × RCB Class",chi:17.59,p:0.48,s:false},
  {t:"Hormone × pCR",chi:5.26,p:0.51,s:false},
  {t:"Biopsy × RCB Class",chi:14.13,p:0.51,s:false},
  {t:"Hormone × Laterality",chi:5.17,p:0.52,s:false},
  {t:"Age Group × pCR",chi:3.10,p:0.54,s:false},
  {t:"Biopsy × pCR",chi:2.38,p:0.79,s:false},
  {t:"Hormone × Clinical Response",chi:12.47,p:0.82,s:false},
];

const crossTabs: Array<{t:string;h:string[];r:any[][];chi:number;pv:number;sig:boolean}> = [
  {t:"Age Group × pCR",h:["Age Group","No (n)","No (%)","Yes (n)","Yes (%)","Total"],r:[["<40 yrs",5,"100.0%",0,"0.0%",5],["41-50 yrs",8,"57.1%",6,"42.9%",14],["51-60 yrs",8,"66.7%",4,"33.3%",12],["61-70 yrs",2,"66.7%",1,"33.3%",3],[">70 yrs",2,"66.7%",1,"33.3%",3],["Total",25,"67.6%",12,"32.4%",37]],chi:3.10,pv:0.54,sig:false},
  {t:"Age Group × RCB Class",h:["Age Group","Class 0","Class I","Class II","Class III","Total"],r:[["<40 yrs","0 (0%)","1 (20%)","3 (60%)","1 (20%)",5],["41-50","6 (42.9%)","3 (21.4%)","5 (35.7%)","0 (0%)",14],["51-60","4 (33.3%)","3 (25%)","1 (8.3%)","4 (33.3%)",12],["61-70","1 (33.3%)","0 (0%)","2 (66.7%)","0 (0%)",3],[">70","1 (33.3%)","0 (0%)","2 (66.7%)","0 (0%)",3],["Total","12 (32.4%)","7 (18.9%)","13 (35.1%)","5 (13.5%)",37]],chi:14.89,pv:0.24,sig:false},
  {t:"Age Group × Clinical Response",h:["Age Group","Complete","Partial","Progressive","Stable","Total"],r:[["<40 yrs","1 (20%)","3 (60%)","0","1 (20%)",5],["41-50","6 (42.9%)","8 (57.1%)","0","0",14],["51-60","3 (25%)","3 (25%)","2 (16.7%)","4 (33.3%)",12],["61-70","0","1 (33.3%)","1 (33.3%)","1 (33.3%)",3],[">70","1 (33.3%)","1 (33.3%)","0","1 (33.3%)",3],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]],chi:13.82,pv:0.31,sig:false},
  {t:"Hormone Status × Laterality",h:["Hormone","Left","Right","Total"],r:[["EP PR +ve","4 (57.1%)","3 (42.9%)",7],["ER+ve Her2+","0","1 (100%)",1],["Her2 +ve","6 (75%)","2 (25%)",8],["PR +ve","1 (50%)","1 (50%)",2],["PR+ve Her2+","2 (100%)","0",2],["TNBC","3 (37.5%)","5 (62.5%)",8],["TPBC","5 (55.6%)","4 (44.4%)",9],["Total","21 (56.8%)","16 (43.2%)",37]],chi:5.17,pv:0.52,sig:false},
  {t:"Hormone Status × Clinical Features",h:["Hormone","Mass","Mass+LN","Pain/Swell","Total"],r:[["EP PR +ve","7 (100%)","0","0",7],["ER+ve Her2+","1 (100%)","0","0",1],["Her2 +ve","5 (62.5%)","1 (12.5%)","2 (25%)",8],["PR +ve","2 (100%)","0","0",2],["PR+ve Her2+","2 (100%)","0","0",2],["TNBC","8 (100%)","0","0",8],["TPBC","9 (100%)","0","0",9],["Total","34 (91.9%)","1 (2.7%)","2 (5.4%)",37]],chi:11.83,pv:0.45,sig:false},
  {t:"Hormone Status × pCR",h:["Hormone","No","Yes","Total"],r:[["EP PR +ve","6 (85.7%)","1 (14.3%)",7],["ER+ve Her2+","1 (100%)","0",1],["Her2 +ve","4 (50%)","4 (50%)",8],["PR +ve","1 (50%)","1 (50%)",2],["PR+ve Her2+","1 (50%)","1 (50%)",2],["TNBC","7 (87.5%)","1 (12.5%)",8],["TPBC","5 (55.6%)","4 (44.4%)",9],["Total","25 (67.6%)","12 (32.4%)",37]],chi:5.26,pv:0.51,sig:false},
  {t:"Hormone Status × RCB Class",h:["Hormone","Class 0","Class I","Class II","Class III","Total"],r:[["EP PR +ve","1 (14.3%)","1 (14.3%)","4 (57.1%)","1 (14.3%)",7],["ER+ve Her2+","0","0","1 (100%)","0",1],["Her2 +ve","4 (50%)","0","4 (50%)","0",8],["PR +ve","1 (50%)","1 (50%)","0","0",2],["PR+ve Her2+","1 (50%)","0","1 (50%)","0",2],["TNBC","1 (12.5%)","2 (25%)","3 (37.5%)","2 (25%)",8],["TPBC","4 (44.4%)","3 (33.3%)","0","2 (22.2%)",9],["Total","12 (32.4%)","7 (18.9%)","13 (35.1%)","5 (13.5%)",37]],chi:17.59,pv:0.48,sig:false},
  {t:"Hormone Status × Clinical Response",h:["Hormone","Complete","Partial","Progressive","Stable","Total"],r:[["EP PR +ve","1 (14.3%)","2 (28.6%)","1 (14.3%)","3 (42.9%)",7],["ER+ve Her2+","0","1 (100%)","0","0",1],["Her2 +ve","2 (25%)","5 (62.5%)","0","1 (12.5%)",8],["PR +ve","1 (50%)","1 (50%)","0","0",2],["PR+ve Her2+","1 (50%)","1 (50%)","0","0",2],["TNBC","1 (12.5%)","4 (50%)","1 (12.5%)","2 (25%)",8],["TPBC","5 (55.6%)","2 (22.2%)","1 (11.1%)","1 (11.1%)",9],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]],chi:12.47,pv:0.82,sig:false},
  {t:"Biopsy × pCR",h:["Biopsy","No","Yes","Total"],r:[["Adenoid Cystic","1 (100%)","0",1],["DCIS","1 (50%)","1 (50%)",2],["Inv. Ca. Breast","17 (65.4%)","9 (34.6%)",26],["Inv. Ca. Sq.","1 (100%)","0",1],["Inv. Ductal Ca.","3 (60%)","2 (40%)",5],["Inv. Solid Pap.","2 (100%)","0",2],["Total","25 (67.6%)","12 (32.4%)",37]],chi:2.38,pv:0.79,sig:false},
  {t:"Biopsy × RCB Class",h:["Biopsy","Class 0","Class I","Class II","Class III","Total"],r:[["Adenoid Cystic","0","0","1 (100%)","0",1],["DCIS","1 (50%)","1 (50%)","0","0",2],["Inv. Ca. Breast","9 (34.6%)","5 (19.2%)","9 (34.6%)","3 (11.5%)",26],["Inv. Ca. Sq.","0","0","1 (100%)","0",1],["Inv. Ductal Ca.","2 (40%)","1 (20%)","0","2 (40%)",5],["Inv. Solid Pap.","0","0","2 (100%)","0",2],["Total","12 (32.4%)","7 (18.9%)","13 (35.1%)","5 (13.5%)",37]],chi:14.13,pv:0.51,sig:false},
  {t:"Biopsy × Clinical Response",h:["Biopsy","Complete","Partial","Progressive","Stable","Total"],r:[["Adenoid Cystic","0","1 (100%)","0","0",1],["DCIS","2 (100%)","0","0","0",2],["Inv. Ca. Breast","6 (23.1%)","13 (50%)","2 (7.7%)","5 (19.2%)",26],["Inv. Ca. Sq.","0","1 (100%)","0","0",1],["Inv. Ductal Ca.","3 (60%)","1 (20%)","0","1 (20%)",5],["Inv. Solid Pap.","0","0","1 (50%)","1 (50%)",2],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]],chi:17.40,pv:0.129,sig:false},
  {t:"RCB Class × Clinical Response ★",h:["RCB Class","Complete","Partial","Progressive","Stable","Total"],r:[["Class 0","7 (58.3%)","3 (25%)","0","2 (16.7%)",12],["Class I","2 (28.6%)","4 (57.1%)","0","1 (14.3%)",7],["Class II","1 (7.7%)","9 (69.2%)","1 (7.7%)","2 (15.4%)",13],["Class III","1 (20%)","0","2 (40%)","2 (40%)",5],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]],chi:20.20,pv:0.01,sig:true},
  {t:"pCR × Clinical Response ★",h:["pCR","Complete","Partial","Progressive","Stable","Total"],r:[["No","4 (16%)","13 (52%)","3 (12%)","5 (20%)",25],["Yes","7 (58.3%)","3 (25%)","0","2 (16.7%)",12],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]],chi:7.74,pv:0.05,sig:true},
  {t:"Clinical TNM × Biopsy ★",h:["Association","χ²","P Value","Significance"],r:[["Clinical TNM × Biopsy","124.49","0.009","Significant"]],chi:124.49,pv:0.009,sig:true},
  {t:"Clinical TNM × RCB Class",h:["Association","χ²","P Value","Significance"],r:[["Clinical TNM × RCB","57.04","0.36","Not Significant"]],chi:57.04,pv:0.36,sig:false},
];

const secs = ["Overview","Demographics","Clinical","Biology","Staging","Response","Pathology","Cross-Tabs","Summary"];

// ─── CUSTOM TOOLTIP ─────────────────────────────────
const CTooltip = (props: any) => {
  const {active, payload, label} = props;
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:"rgba(15,23,42,0.92)",backdropFilter:"blur(12px)",borderRadius:10,padding:"10px 14px",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 8px 32px rgba(0,0,0,0.2)"}}>
      <p style={{color:"#e2e8f0",fontSize:11,fontWeight:700,margin:"0 0 6px",letterSpacing:0.3}}>{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} style={{color:e.color||"#94a3b8",fontSize:11,margin:"2px 0",fontWeight:500}}>
          {e.name}: <span style={{color:"#fff",fontWeight:700}}>{e.value}</span>
        </p>
      ))}
    </div>
  );
};

// ─── REUSABLE COMPONENTS ────────────────────────────
const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{background:P.card,borderRadius:16,border:`1px solid ${P.border}`,padding:24,boxShadow:"0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.02)",transition:"box-shadow 0.2s",overflow:"hidden",...style}}>{children}</div>
);

const Metric: React.FC<{label:string; value:string; sub?:string; color?:string}> = ({label, value, sub, color="#6366f1"}) => (
  <div style={{background:`linear-gradient(135deg, ${color}08, ${color}04)`,border:`1px solid ${color}18`,borderRadius:14,padding:"18px 20px",minWidth:140,flex:"1 1 150px"}}>
    <div style={{fontSize:11,fontWeight:700,color:P.textMuted,textTransform:"uppercase",letterSpacing:1.2,marginBottom:6}}>{label}</div>
    <div style={{fontSize:28,fontWeight:800,color:P.text,lineHeight:1.1,letterSpacing:-0.5}}>{value}</div>
    {sub && <div style={{fontSize:11,color:P.textSec,marginTop:4,fontWeight:500}}>{sub}</div>}
  </div>
);

const SectionHead: React.FC<{num:number; title:string; sub?:string}> = ({num, title, sub}) => (
  <div style={{marginBottom:28,paddingTop:8}}>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
      <span style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontSize:12,fontWeight:800,width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>{num}</span>
      <h2 style={{fontSize:22,fontWeight:800,color:P.text,margin:0,letterSpacing:-0.4}}>{title}</h2>
    </div>
    {sub && <p style={{fontSize:13,color:P.textSec,margin:"0 0 0 44px",lineHeight:1.5}}>{sub}</p>}
    <div style={{height:2,background:"linear-gradient(90deg,#6366f1,transparent)",marginTop:12,borderRadius:2}} />
  </div>
);

const ChartTitle: React.FC<{children: React.ReactNode}> = ({children}) => (
  <p style={{fontSize:12,fontWeight:700,color:P.textSec,margin:"0 0 14px",letterSpacing:0.2}}>{children}</p>
);

const Tbl: React.FC<{caption:string; headers:string[]; rows:any[][]; chi?:number; pv?:number; sig?:boolean; compact?:boolean}> = ({caption, headers, rows, chi, pv, sig, compact}) => (
  <div style={{marginBottom:20,overflow:"hidden"}}>
    {caption && <p style={{fontSize:12,fontWeight:700,color:P.text,marginBottom:8}}>{caption}</p>}
    <div style={{overflowX:"auto",borderRadius:10,border:`1px solid ${P.border}`}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:compact?11:12}}>
        <thead>
          <tr style={{background:"#f1f5f9"}}>
            {headers.map((h: string, i: number) => <th key={i} style={{padding:"8px 12px",textAlign:"left",fontWeight:700,color:P.text,borderBottom:`2px solid ${P.border}`,whiteSpace:"nowrap",fontSize:11}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any[], i: number) => (
            <tr key={i} style={{background:i===rows.length-1?"#f8fafc":"#fff",fontWeight:i===rows.length-1?700:400,borderBottom:`1px solid ${P.border}`}}>
              {r.map((c: any, j: number) => <td key={j} style={{padding:"7px 12px",color:P.textSec,whiteSpace:"nowrap"}}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {chi !== undefined && (
      <p style={{fontSize:11,marginTop:6,color:sig?P.emeraldDk:P.textMuted,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>
        <span style={{display:"inline-block",width:8,height:8,borderRadius:4,background:sig?P.emerald:P.textMuted}} />
        χ² = {chi}, P = {pv} — {sig?"Statistically Significant":"Not Significant"}
      </p>
    )}
  </div>
);

const Badge: React.FC<{children: React.ReactNode; color?: string}> = ({children, color=P.indigo}) => (
  <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:700,background:`${color}14`,color:color,letterSpacing:0.4}}>{children}</span>
);

// ─── LATERALITY: HORIZONTAL BAR instead of overlapping pie ──
const LatBar: React.FC = () => (
  <div>
    <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
      <div style={{textAlign:"center",flex:1}}>
        <div style={{fontSize:36,fontWeight:900,color:"#6366f1",lineHeight:1}}>56.8%</div>
        <div style={{fontSize:13,fontWeight:700,color:P.textSec,marginTop:4}}>Left (n=21)</div>
      </div>
      <div style={{width:1,height:50,background:P.border}} />
      <div style={{textAlign:"center",flex:1}}>
        <div style={{fontSize:36,fontWeight:900,color:"#f43f5e",lineHeight:1}}>43.2%</div>
        <div style={{fontSize:13,fontWeight:700,color:P.textSec,marginTop:4}}>Right (n=16)</div>
      </div>
    </div>
    <div style={{display:"flex",borderRadius:12,overflow:"hidden",height:32}}>
      <div style={{width:"56.8%",background:"#6366f1",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:700}}>Left 21</div>
      <div style={{width:"43.2%",background:"#f43f5e",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:700}}>Right 16</div>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:8,marginBottom:20}}>
      <span style={{fontSize:10,color:P.textMuted}}>0%</span>
      <span style={{fontSize:10,color:P.textMuted}}>Total N=37</span>
      <span style={{fontSize:10,color:P.textMuted}}>100%</span>
    </div>

    {/* Cohort snapshot */}
    <div style={{borderTop:`1px solid ${P.border}`,paddingTop:16}}>
      <p style={{fontSize:11,fontWeight:700,color:P.textSec,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:1}}>Cohort Snapshot</p>
      {([["Gender","100% Female","37/37"],["Lesions","Single (100%)","37/37"],["Mean Age","51.57 ± 10.23 yrs","—"],["Peak Group","41–50 yrs","37.8%"]] as const).map(([k,v,n],i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<3?`1px solid ${P.border}08`:"none"}}>
          <span style={{fontSize:12,color:P.textMuted,fontWeight:500}}>{k}</span>
          <div style={{textAlign:"right"}}>
            <span style={{fontSize:12,color:P.text,fontWeight:700}}>{v}</span>
            <span style={{fontSize:10,color:P.textMuted,marginLeft:8}}>{n}</span>
          </div>
        </div>
      ))}
    </div>
    <div style={{background:"#eef2ff",border:"1px solid #c7d2fe",borderRadius:10,padding:"10px 14px",marginTop:14}}>
      <p style={{fontSize:11,color:"#4338ca",margin:0,fontWeight:600,lineHeight:1.5}}>Left-sided predominance (56.8%) is consistent with published literature showing slightly higher breast cancer incidence on the left side.</p>
    </div>
  </div>
);

// ─── pCR Visual ─────────────────────────────────────
const PcrVisual: React.FC = () => (
  <div>
    <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:20}}>
      <div style={{position:"relative",width:120,height:120}}>
        <svg viewBox="0 0 120 120" width={120} height={120}>
          <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="12" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="#10b981" strokeWidth="12"
            strokeDasharray={`${32.4 * 3.267} ${100 * 3.267}`}
            strokeDashoffset="0" strokeLinecap="round"
            transform="rotate(-90 60 60)" />
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:24,fontWeight:900,color:P.text}}>32.4%</span>
          <span style={{fontSize:9,color:P.textMuted,fontWeight:600}}>pCR</span>
        </div>
      </div>
      <div style={{flex:1}}>
        <div style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:600,color:P.emeraldDk}}>pCR (Yes)</span>
            <span style={{fontSize:12,fontWeight:800,color:P.text}}>12 (32.4%)</span>
          </div>
          <div style={{height:8,background:"#e2e8f0",borderRadius:4,overflow:"hidden"}}>
            <div style={{width:"32.4%",height:"100%",background:"#10b981",borderRadius:4}} />
          </div>
        </div>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:12,fontWeight:600,color:P.textSec}}>Residual (No)</span>
            <span style={{fontSize:12,fontWeight:800,color:P.text}}>25 (67.6%)</span>
          </div>
          <div style={{height:8,background:"#e2e8f0",borderRadius:4,overflow:"hidden"}}>
            <div style={{width:"67.6%",height:"100%",background:"#94a3b8",borderRadius:4}} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── MAIN APP ───────────────────────────────────────
export default function App() {
  const [sec, setSec] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTo = (i: number) => {
    refs.current[i]?.scrollIntoView({behavior:"smooth",block:"start"});
    setSec(i);
  };

  return (
    <div style={{fontFamily:"'Inter','SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",background:"linear-gradient(180deg,#f0f2f8 0%,#f8fafc 100%)",minHeight:"100vh",color:P.text}}>

      {/* ═══ STICKY NAV ═══ */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,0.82)",backdropFilter:"blur(16px) saturate(180%)",borderBottom:"1px solid rgba(226,232,240,0.6)",padding:"0 24px"}}>
        <div style={{maxWidth:1080,margin:"0 auto",display:"flex",alignItems:"center",gap:8,overflowX:"auto",height:52}}>
          {secs.map((s,i) => (
            <button key={i} onClick={()=>scrollTo(i)} style={{padding:"6px 14px",borderRadius:8,border:"none",background:sec===i?"#6366f1":"transparent",color:sec===i?"#fff":"#64748b",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s",letterSpacing:0.2}}>{s}</button>
          ))}
        </div>
      </nav>

      <div style={{maxWidth:1080,margin:"0 auto",padding:"32px 24px 80px"}}>

        {/* ═══ SEC 0: HERO ═══ */}
        <div ref={el => { refs.current[0] = el; }} style={{marginBottom:48}}>
          <div style={{background:"linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4338ca 100%)",borderRadius:24,padding:"48px 40px",color:"#fff",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-60,right:-60,width:260,height:260,borderRadius:"50%",background:"rgba(139,92,246,0.12)",filter:"blur(40px)"}} />
            <div style={{position:"absolute",bottom:-40,left:-40,width:200,height:200,borderRadius:"50%",background:"rgba(99,102,241,0.1)",filter:"blur(30px)"}} />
            <div style={{position:"relative",zIndex:1}}>
              <Badge color="#a5b4fc">Thesis Statistics Report</Badge>
              <h1 style={{fontSize:32,fontWeight:900,lineHeight:1.2,margin:"16px 0 12px",maxWidth:700,letterSpacing:-0.8}}>Clinico-Pathological Correlation of Neoadjuvant Chemotherapy Outcomes in Invasive Breast Carcinoma</h1>
              <p style={{fontSize:15,color:"#c7d2fe",margin:0,maxWidth:600,lineHeight:1.6}}>Comprehensive Statistical Analysis of 37 Cases</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:28}}>
                {([["Cohort","N = 37 | All Female"],["Staging","AJCC 8th Edition"],["Response","RECIST 1.1"],["Pathology","RCB Index"],["Analytics","15 Chi-Square Tests"],["Content","31 Tables · 12 Figures"]] as const).map(([l,v],i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"8px 16px",backdropFilter:"blur(8px)"}}>
                    <div style={{fontSize:9,fontWeight:700,color:"#a5b4fc",textTransform:"uppercase",letterSpacing:1.2}}>{l}</div>
                    <div style={{fontSize:12,fontWeight:600,color:"#e0e7ff",marginTop:2}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{display:"flex",flexWrap:"wrap",gap:14,marginTop:20}}>
            <Metric label="pCR Rate" value="32.4%" sub="12 of 37 patients" color="#10b981" />
            <Metric label="Overall Response" value="72.9%" sub="CR + PR (27/37)" color="#6366f1" />
            <Metric label="Nodal Conversion" value="57.1%" sub="16/28 → node-negative" color="#06b6d4" />
            <Metric label="Tumor Reduction" value="51.2%" sub="4.49 → 2.19 cm mean" color="#f59e0b" />
          </div>
        </div>

        {/* ═══ SEC 1: DEMOGRAPHICS ═══ */}
        <div ref={el => { refs.current[1] = el; }} style={{marginBottom:48}}>
          <SectionHead num={1} title="Baseline Demographics" sub="Cohort: 37 female patients · Mean age 51.57 ± 10.23 years · 100% single lesion" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
            <Card>
              <ChartTitle>Age Group Distribution (N=37)</ChartTitle>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={age} margin={{top:20,right:10,left:-10,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="g" tick={{fontSize:11,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} />
                  <Bar dataKey="n" radius={[8,8,0,0]} name="Count">
                    {age.map((_,i) => <Cell key={i} fill={i===1?"#6366f1":i===2?"#818cf8":"#c7d2fe"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Tbl caption="" headers={["Age Group","n","(%)"]} rows={[...age.map(d=>[d.g,d.n,d.p+"%"]),["Total",37,"100%"]]} compact />
            </Card>
            <Card>
              <ChartTitle>Breast Laterality</ChartTitle>
              <LatBar />
            </Card>
          </div>
        </div>

        {/* ═══ SEC 2: CLINICAL ═══ */}
        <div ref={el => { refs.current[2] = el; }} style={{marginBottom:48}}>
          <SectionHead num={2} title="Clinical Profile" sub="Features at presentation, tumor diameter measurements pre- and post-NAC" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
            <Card>
              <ChartTitle>Clinical Features at Presentation</ChartTitle>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={clin} layout="vertical" margin={{top:5,right:30,left:5,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="f" type="category" width={130} tick={{fontSize:11,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} />
                  <Bar dataKey="n" fill="#6366f1" radius={[0,8,8,0]} name="Count" barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <ChartTitle>Mean Tumor Diameter: Pre vs Post NAC</ChartTitle>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={diam} margin={{top:20,right:20,left:0,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="ph" tick={{fontSize:12,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} domain={[0,6]} />
                  <Tooltip content={<CTooltip />} />
                  <Bar dataKey="mean" fill="#6366f1" radius={[8,8,0,0]} name="Mean (cm)" barSize={56} label={{position:"top",fontSize:13,fill:P.text,fontWeight:800}} />
                  <Line type="monotone" dataKey="mean" stroke="#f43f5e" strokeWidth={2} dot={{r:5,fill:"#f43f5e"}} />
                </ComposedChart>
              </ResponsiveContainer>
              <div style={{background:P.amberLt,border:"1px solid #fde68a",borderRadius:10,padding:"10px 14px",marginTop:12}}>
                <p style={{fontSize:11,color:P.amberDk,margin:0,fontWeight:600}}>51.2% mean diameter reduction — 4.49 ± 2.19 cm → 2.19 ± 2.06 cm (range 1.4–11.5 → 0.1–6.8)</p>
              </div>
            </Card>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20,marginTop:20}}>
            <Card>
              <ChartTitle>Diameter by Hormone Status (Pre vs Post)</ChartTitle>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={diamH} margin={{top:20,right:10,left:-10,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="n" tick={{fontSize:9,fill:P.textSec}} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} /><Legend wrapperStyle={{fontSize:11}} />
                  <Bar dataKey="pre" fill="#f43f5e" name="Pre-Chemo" radius={[6,6,0,0]} barSize={16} />
                  <Bar dataKey="post" fill="#10b981" name="Post-Chemo" radius={[6,6,0,0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <ChartTitle>Diameter by Biopsy Type (Pre vs Post)</ChartTitle>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={diamB} margin={{top:20,right:10,left:-10,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="n" tick={{fontSize:9,fill:P.textSec}} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} /><Legend wrapperStyle={{fontSize:11}} />
                  <Bar dataKey="pre" fill="#6366f1" name="Pre-Chemo" radius={[6,6,0,0]} barSize={16} />
                  <Bar dataKey="post" fill="#06b6d4" name="Post-Chemo" radius={[6,6,0,0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        {/* ═══ SEC 3: BIOLOGY ═══ */}
        <div ref={el => { refs.current[3] = el; }} style={{marginBottom:48}}>
          <SectionHead num={3} title="Biological Profiling" sub="Molecular subtype distribution and biopsy histology classification" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
            <Card>
              <ChartTitle>Molecular Subtype Distribution (7 Categories)</ChartTitle>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hormone} layout="vertical" margin={{top:5,right:40,left:5,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="n" type="category" width={100} tick={{fontSize:11,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} />
                  <Bar dataKey="v" radius={[0,8,8,0]} name="Count" barSize={22} label={{position:"right",fontSize:11,fill:P.text,fontWeight:700}}>
                    {hormone.map((_,i) => <Cell key={i} fill={CC[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <ChartTitle>Biopsy Histology (6 Types)</ChartTitle>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={biopsy} layout="vertical" margin={{top:5,right:40,left:5,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="t" type="category" width={140} tick={{fontSize:10,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} />
                  <Bar dataKey="n" radius={[0,8,8,0]} name="Count" barSize={22} label={{position:"right",fontSize:11,fill:P.text,fontWeight:700}}>
                    {biopsy.map((_,i) => <Cell key={i} fill={CC[i%CC.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        {/* ═══ SEC 4: STAGING ═══ */}
        <div ref={el => { refs.current[4] = el; }} style={{marginBottom:48}}>
          <SectionHead num={4} title="TNM Staging" sub="Clinical pre-treatment (19 categories) and post-surgical pathological staging (17 categories)" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
            <Card>
              <ChartTitle>Clinical TNM — Pre-Treatment (Top 10)</ChartTitle>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tnmPre} layout="vertical" margin={{top:5,right:30,left:5,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="s" type="category" width={110} tick={{fontSize:10,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} />
                  <Bar dataKey="n" fill="#f59e0b" radius={[0,8,8,0]} name="Count" barSize={20} label={{position:"right",fontSize:10,fill:P.text,fontWeight:700}} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <ChartTitle>Post-Surgical TN Staging (Top Groups)</ChartTitle>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tnmPost} layout="vertical" margin={{top:5,right:30,left:5,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="s" type="category" width={110} tick={{fontSize:10,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} />
                  <Bar dataKey="n" fill="#10b981" radius={[0,8,8,0]} name="Count" barSize={20} label={{position:"right",fontSize:10,fill:P.text,fontWeight:700}} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        {/* ═══ SEC 5: RESPONSE ═══ */}
        <div ref={el => { refs.current[5] = el; }} style={{marginBottom:48}}>
          <SectionHead num={5} title="Treatment Response" sub="RECIST 1.1 clinical response and axillary nodal conversion" />
          <div style={{display:"flex",flexWrap:"wrap",gap:14,marginBottom:20}}>
            <Metric label="Overall Response Rate" value="72.9%" color="#10b981" />
            <Metric label="Complete Response" value="29.7%" sub="n = 11" color="#10b981" />
            <Metric label="Partial Response" value="43.2%" sub="n = 16" color="#06b6d4" />
            <Metric label="Non-Responders" value="27.0%" sub="n = 10" color="#f43f5e" />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
            <Card>
              <ChartTitle>RECIST 1.1 Clinical Response</ChartTitle>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={resp} margin={{top:20,right:10,left:-10,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{fontSize:11,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} />
                  <Bar dataKey="n" radius={[8,8,0,0]} name="Count" barSize={48} label={{position:"top",fontSize:12,fill:P.text,fontWeight:800}}>
                    {resp.map((_,i) => <Cell key={i} fill={RESP_C[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <ChartTitle>Axillary Nodal Conversion (Pre vs Post)</ChartTitle>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={nodal} margin={{top:20,right:10,left:-10,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="ph" tick={{fontSize:12,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} /><Legend wrapperStyle={{fontSize:11}} />
                  <Bar dataKey="pos" fill="#f43f5e" name="Node Positive" radius={[6,6,0,0]} barSize={36} />
                  <Bar dataKey="neg" fill="#10b981" name="Node Negative" radius={[6,6,0,0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{background:P.emeraldLt,border:"1px solid #a7f3d0",borderRadius:10,padding:"10px 14px",marginTop:8}}>
                <p style={{fontSize:11,color:P.emeraldDk,margin:0,fontWeight:600}}>57.1% nodal conversion — 16 of 28 node-positive patients converted to node-negative post-NAC</p>
              </div>
            </Card>
          </div>
        </div>

        {/* ═══ SEC 6: PATHOLOGY ═══ */}
        <div ref={el => { refs.current[6] = el; }} style={{marginBottom:48}}>
          <SectionHead num={6} title="Pathological Outcomes" sub="Pathological complete response (pCR) and Residual Cancer Burden classification" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:20}}>
            <Card>
              <ChartTitle>Pathological Complete Response (pCR)</ChartTitle>
              <PcrVisual />
              <Tbl caption="" headers={["pCR","n","(%)"]} rows={[["No",25,"67.6%"],["Yes",12,"32.4%"],["Total",37,"100.0%"]]} compact />
            </Card>
            <Card>
              <ChartTitle>Residual Cancer Burden (RCB) Classification</ChartTitle>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={rcb} margin={{top:20,right:10,left:-10,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{fontSize:10,fill:P.textSec}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize:10,fill:P.textMuted}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CTooltip />} />
                  <Bar dataKey="n" radius={[8,8,0,0]} name="Count" barSize={44} label={{position:"top",fontSize:12,fill:P.text,fontWeight:800}}>
                    {rcb.map((_,i) => <Cell key={i} fill={RCB_C[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Tbl caption="" headers={["RCB Class","n","(%)","Meaning"]} rows={[["Class 0 (pCR)",12,"32.4%","Complete"],["Class I",7,"18.9%","Minimal"],["Class II",13,"35.1%","Moderate"],["Class III",5,"13.5%","Extensive"],["Total",37,"100.0%",""]]} compact />
            </Card>
          </div>
        </div>

        {/* ═══ SEC 7: CROSS-TABS ═══ */}
        <div ref={el => { refs.current[7] = el; }} style={{marginBottom:48}}>
          <SectionHead num={7} title="Cross-Tabulation Analyses" sub="All 15 chi-square tests of association. ★ = statistically significant (P ≤ 0.05)" />
          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:16}}>
            {crossTabs.map((ct,i) => (
              <Card key={i} style={{borderLeft:ct.sig?`4px solid ${P.emerald}`:"4px solid transparent"}}>
                <Tbl caption={ct.t} headers={ct.h} rows={ct.r} chi={ct.chi} pv={ct.pv} sig={ct.sig} compact />
              </Card>
            ))}
          </div>
        </div>

        {/* ═══ SEC 8: SUMMARY ═══ */}
        <div ref={el => { refs.current[8] = el; }} style={{marginBottom:48}}>
          <SectionHead num={8} title="Complete Statistical Summary" sub="Master table of all 15 chi-square tests and final interpretations" />
          <Card style={{marginBottom:24}}>
            <Tbl caption="Master Table — All Chi-Square Tests (N=15)" headers={["#","Association","χ²","P","Result"]}
              rows={allStats.map((s,i)=>[i+1,s.t,s.chi,s.p,s.s?"✓ Significant":"Not Significant"])} />
          </Card>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20,marginBottom:28}}>
            <Card style={{background:"linear-gradient(135deg,#ecfdf5,#d1fae5)",border:"1px solid #a7f3d0"}}>
              <p style={{fontSize:11,fontWeight:800,color:P.emeraldDk,textTransform:"uppercase",letterSpacing:1.2,margin:"0 0 12px"}}>Significant Associations (3/15)</p>
              {allStats.filter(s=>s.s).map((s,i)=>(
                <div key={i} style={{padding:"8px 0",borderBottom:i<2?`1px solid #a7f3d044`:"none"}}>
                  <p style={{fontSize:12,color:"#065f46",margin:0,fontWeight:700}}>{s.t}</p>
                  <p style={{fontSize:11,color:"#047857",margin:"2px 0 0",fontWeight:500}}>χ² = {s.chi}, P = {s.p}</p>
                </div>
              ))}
            </Card>
            <Card style={{background:"linear-gradient(135deg,#eef2ff,#e0e7ff)",border:"1px solid #c7d2fe"}}>
              <p style={{fontSize:11,fontWeight:800,color:P.indigoDk,textTransform:"uppercase",letterSpacing:1.2,margin:"0 0 12px"}}>Key Outcome Metrics</p>
              {([["pCR Rate","32.4% (12/37)"],["ORR (CR+PR)","72.9% (27/37)"],["Nodal Conversion","57.1% (16/28)"],["Mean Diameter Δ","51.2%"]] as const).map(([l,v],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<3?`1px solid #c7d2fe44`:"none"}}>
                  <span style={{fontSize:12,color:"#3730a3",fontWeight:500}}>{l}</span>
                  <span style={{fontSize:12,color:"#1e1b4b",fontWeight:800}}>{v}</span>
                </div>
              ))}
            </Card>
          </div>

          {/* FINAL INTERPRETATIONS */}
          <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#312e81 100%)",borderRadius:20,padding:"36px 32px",color:"#fff"}}>
            <h3 style={{fontSize:20,fontWeight:800,margin:"0 0 24px",letterSpacing:-0.3}}>Final Interpretations</h3>
            <div style={{display:"grid",gap:20}}>
              {[
                {t:"Clinical Predictability",c:"RECIST response categories significantly predict final pathological burden. RCB Class 0 patients had 58.3% complete clinical response vs 7.7% in Class II (χ²=20.20, P=0.01). pCR also significantly correlated with clinical response (χ²=7.74, P=0.05)."},
                {t:"Staging–Histology Correlation",c:"Clinical TNM staging showed highly significant association with biopsy histology (χ²=124.49, P=0.009), indicating invasive carcinoma variants correlate with specific staging patterns."},
                {t:"Nodal Impact",c:"NAC achieved 57.1% nodal conversion (16/28 → node-negative), substantially reducing surgical burden."},
                {t:"Non-Significant Predictors",c:"Age (P=0.54), hormone receptor status (P=0.51), laterality, and biopsy histology were not individually significant predictors of pCR or RCB in this cohort (N=37)."},
                {t:"Tumor Size Reduction",c:"Mean diameter decreased from 4.49 ± 2.19 cm to 2.19 ± 2.06 cm (51.2%). PR +ve subtype showed greatest reduction (87%), while invasive solid papillary carcinoma paradoxically increased (4.5 → 6.6 cm)."},
              ].map((item,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"16px 20px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <span style={{background:"rgba(99,102,241,0.3)",color:"#a5b4fc",fontSize:11,fontWeight:800,width:24,height:24,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>{i+1}</span>
                    <span style={{fontSize:14,fontWeight:700,color:"#e0e7ff"}}>{item.t}</span>
                  </div>
                  <p style={{fontSize:12,color:"#c7d2fe",margin:0,lineHeight:1.7,paddingLeft:34}}>{item.c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{textAlign:"center",paddingTop:24,borderTop:`1px solid ${P.border}`}}>
          <p style={{fontSize:10,fontWeight:700,color:P.textMuted,letterSpacing:2,textTransform:"uppercase",margin:0}}>
            End of Report · NAC Study · N=37 · 31 Tables · 12 Figures · 15 Chi-Square Analyses · AJCC 8th Ed. · RECIST 1.1 · RCB Index
          </p>
        </div>
      </div>
    </div>
  );
}