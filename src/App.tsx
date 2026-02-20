import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const C = ["#4f46e5","#ec4899","#8b5cf6","#f59e0b","#10b981","#6366f1","#f43f5e","#06b6d4","#84cc16","#a855f7"];

export default function App() {
  const [dummy] = useState(0);

  /* ════════════════════════════════════════════════════════
     DATA
  ════════════════════════════════════════════════════════ */

  // 1. Demographics
  const age = [
    { group: "<40 yrs", n: 5, pct: 13.5 },{ group: "41-50 yrs", n: 14, pct: 37.8 },
    { group: "51-60 yrs", n: 12, pct: 32.4 },{ group: "61-70 yrs", n: 3, pct: 8.1 },
    { group: ">70 yrs", n: 3, pct: 8.1 },
  ];
  const lat = [{ name: "Left", n: 21, pct: 56.8 },{ name: "Right", n: 16, pct: 43.2 }];

  // 2. Clinical Profile
  const clin = [
    { feature: "Mass", n: 34, pct: 91.9 },
    { feature: "Mass With Palpable Lymphnodes", n: 1, pct: 2.7 },
    { feature: "Pain And Swelling", n: 2, pct: 5.4 },
  ];
  const diam = [
    { phase: "Pre-Chemotherapy", mean: 4.49, sd: 2.19, min: 1.4, max: 11.5 },
    { phase: "Post-Chemotherapy", mean: 2.19, sd: 2.06, min: 0.1, max: 6.8 },
  ];
  const diamH = [
    { name: "EP PR +ve", pre: 3.586, post: 2.657 },{ name: "ER+ve Her2+", pre: 8.19, post: 4.0 },
    { name: "Her2 +ve", pre: 4.886, post: 1.663 },{ name: "PR +ve", pre: 3.85, post: 0.5 },
    { name: "PR+ve Her2+", pre: 7.1, post: 2.35 },{ name: "TNBC", pre: 4.85, post: 3.588 },
    { name: "TPBC", pre: 3.7, post: 1.2 },
  ];
  const diamB = [
    { name: "Adenoid Cystic", pre: 7.0, post: 4.8 },{ name: "DCIS", pre: 4.7, post: 0.0 },
    { name: "Inv. Ca. Breast", pre: 3.988, post: 1.881 },{ name: "Inv. Ca. Sq. Diff.", pre: 11.5, post: 4.7 },
    { name: "Inv. Ductal Ca.", pre: 5.16, post: 1.9 },{ name: "Inv. Solid Pap.", pre: 4.5, post: 6.6 },
  ];

  // 3. Biological Profiling
  const hormone = [
    { name: "EP PR +ve", n: 7, pct: 18.9 },{ name: "ER+ve Her2 +ve", n: 1, pct: 2.7 },
    { name: "Her2 +ve", n: 8, pct: 21.6 },{ name: "PR +ve", n: 2, pct: 5.4 },
    { name: "PR +ve Her2 +ve", n: 2, pct: 5.4 },{ name: "TNBC", n: 8, pct: 21.6 },
    { name: "TPBC", n: 9, pct: 24.3 },
  ];
  const biopsy = [
    { type: "Adenoid Cystic Carcinoma (High Grade)", n: 1, pct: 2.7 },
    { type: "Ductal Carcinoma In Situ", n: 2, pct: 5.4 },
    { type: "Invasive Carcinoma of Breast", n: 26, pct: 70.3 },
    { type: "Invasive Ca. with Squamous Diff.", n: 1, pct: 2.7 },
    { type: "Invasive Ductal Carcinoma", n: 5, pct: 13.5 },
    { type: "Invasive Solid Papillary Ca.", n: 2, pct: 5.4 },
  ];

  // 4. TNM Staging
  const tnmPre = [
    { s: "CT1N0M0", n: 1, p: 2.7 },{ s: "CT2N0", n: 2, p: 5.4 },{ s: "CT2N0M0", n: 3, p: 8.1 },
    { s: "CT2N1", n: 3, p: 8.1 },{ s: "CT2N1M0", n: 3, p: 8.1 },{ s: "CT2N1M1", n: 1, p: 2.7 },
    { s: "CT3N0", n: 1, p: 2.7 },{ s: "CT3N0M0", n: 2, p: 5.4 },{ s: "CT3N1", n: 1, p: 2.7 },
    { s: "CT3N1M0", n: 4, p: 10.8 },{ s: "CT3N1M1", n: 1, p: 2.7 },{ s: "CT3N2M0", n: 1, p: 2.7 },
    { s: "CT4AN1M0", n: 1, p: 2.7 },{ s: "CT4BN0", n: 2, p: 5.4 },{ s: "CT4BN0M0", n: 2, p: 5.4 },
    { s: "CT4BN1", n: 1, p: 2.7 },{ s: "CT4bN2a", n: 1, p: 2.7 },{ s: "CT4BN2M0", n: 6, p: 16.2 },
    { s: "CT4BN3C", n: 1, p: 2.7 },
  ];
  const tnmPost = [
    { s: "YPT0N0", n: 12, p: 32.4 },{ s: "YPT0N1", n: 2, p: 5.4 },{ s: "YPT1A(4)N1A", n: 2, p: 5.4 },
    { s: "YPT1AN0", n: 3, p: 8.1 },{ s: "YPT1aN1a", n: 1, p: 2.7 },{ s: "YPT1aN2a", n: 1, p: 2.7 },
    { s: "YPT1B(2)N0", n: 1, p: 2.7 },{ s: "YPT1BN1A", n: 1, p: 2.7 },{ s: "YPT1BN2A", n: 1, p: 2.7 },
    { s: "YPT1C(3)N0", n: 1, p: 2.7 },{ s: "YPT1CN0", n: 2, p: 5.4 },{ s: "YPT2N0", n: 2, p: 5.4 },
    { s: "YPT2N1A", n: 2, p: 5.4 },{ s: "YPT2N2A", n: 1, p: 2.7 },{ s: "YPT3N0", n: 3, p: 8.1 },
    { s: "YPT3N3A", n: 1, p: 2.7 },{ s: "YPTISN0", n: 1, p: 2.7 },
  ];

  // 5. Treatment Response
  const resp = [
    { name: "Complete Response", n: 11, pct: 29.7 },{ name: "Partial Response", n: 16, pct: 43.2 },
    { name: "Progressive Disease", n: 3, pct: 8.1 },{ name: "Stable Disease", n: 7, pct: 18.9 },
  ];

  // 6. Pathological Outcomes
  const rcb = [
    { name: "Class 0 (pCR)", n: 12, pct: 32.4 },{ name: "Class I", n: 7, pct: 18.9 },
    { name: "Class II", n: 13, pct: 35.1 },{ name: "Class III", n: 5, pct: 13.5 },
  ];

  // 7. Cross-Tabulations
  const crossTabs: Array<{t:string;h:string[];r:any[][];chi:number;pv:number;sig:boolean}> = [
    { t: "Age Group × Pathological Complete Response", h: ["Age Group","No (n)","No (%)","Yes (n)","Yes (%)","Total"],
      r: [["<40 yrs",5,"100.0%",0,"0.0%",5],["41-50 yrs",8,"57.1%",6,"42.9%",14],["51-60 yrs",8,"66.7%",4,"33.3%",12],["61-70 yrs",2,"66.7%",1,"33.3%",3],[">70 yrs",2,"66.7%",1,"33.3%",3],["Total",25,"67.6%",12,"32.4%",37]], chi:3.10,pv:0.54,sig:false },
    { t: "Age Group × RCB Class", h: ["Age Group","Class 0","Class I","Class II","Class III","Total"],
      r: [["<40 yrs","0 (0%)","1 (20%)","3 (60%)","1 (20%)",5],["41-50 yrs","6 (42.9%)","3 (21.4%)","5 (35.7%)","0 (0%)",14],["51-60 yrs","4 (33.3%)","3 (25%)","1 (8.3%)","4 (33.3%)",12],["61-70 yrs","1 (33.3%)","0 (0%)","2 (66.7%)","0 (0%)",3],[">70 yrs","1 (33.3%)","0 (0%)","2 (66.7%)","0 (0%)",3],["Total","12 (32.4%)","7 (18.9%)","13 (35.1%)","5 (13.5%)",37]], chi:14.89,pv:0.24,sig:false },
    { t: "Age Group × Clinical Response", h: ["Age Group","Complete","Partial","Progressive","Stable","Total"],
      r: [["<40 yrs","1 (20%)","3 (60%)","0 (0%)","1 (20%)",5],["41-50 yrs","6 (42.9%)","8 (57.1%)","0 (0%)","0 (0%)",14],["51-60 yrs","3 (25%)","3 (25%)","2 (16.7%)","4 (33.3%)",12],["61-70 yrs","0 (0%)","1 (33.3%)","1 (33.3%)","1 (33.3%)",3],[">70 yrs","1 (33.3%)","1 (33.3%)","0 (0%)","1 (33.3%)",3],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]], chi:13.82,pv:0.31,sig:false },
    { t: "Hormone Status × Laterality", h: ["Hormone Status","Left","Right","Total"],
      r: [["EP PR +ve","4 (57.1%)","3 (42.9%)",7],["ER+ve Her2 +ve","0 (0%)","1 (100%)",1],["Her2 +ve","6 (75%)","2 (25%)",8],["PR +ve","1 (50%)","1 (50%)",2],["PR +ve Her2 +ve","2 (100%)","0 (0%)",2],["TNBC","3 (37.5%)","5 (62.5%)",8],["TPBC","5 (55.6%)","4 (44.4%)",9],["Total","21 (56.8%)","16 (43.2%)",37]], chi:5.17,pv:0.52,sig:false },
    { t: "Hormone Status × Clinical Features", h: ["Hormone","Mass","Mass+LN","Pain/Swelling","Total"],
      r: [["EP PR +ve","7 (100%)","0","0",7],["ER+ve Her2 +ve","1 (100%)","0","0",1],["Her2 +ve","5 (62.5%)","1 (12.5%)","2 (25%)",8],["PR +ve","2 (100%)","0","0",2],["PR +ve Her2 +ve","2 (100%)","0","0",2],["TNBC","8 (100%)","0","0",8],["TPBC","9 (100%)","0","0",9],["Total","34 (91.9%)","1 (2.7%)","2 (5.4%)",37]], chi:11.83,pv:0.45,sig:false },
    { t: "Hormone Status × pCR", h: ["Hormone Status","No","Yes","Total"],
      r: [["EP PR +ve","6 (85.7%)","1 (14.3%)",7],["ER+ve Her2 +ve","1 (100%)","0 (0%)",1],["Her2 +ve","4 (50%)","4 (50%)",8],["PR +ve","1 (50%)","1 (50%)",2],["PR +ve Her2 +ve","1 (50%)","1 (50%)",2],["TNBC","7 (87.5%)","1 (12.5%)",8],["TPBC","5 (55.6%)","4 (44.4%)",9],["Total","25 (67.6%)","12 (32.4%)",37]], chi:5.26,pv:0.51,sig:false },
    { t: "Hormone Status × RCB Class", h: ["Hormone","Class 0","Class I","Class II","Class III","Total"],
      r: [["EP PR +ve","1 (14.3%)","1 (14.3%)","4 (57.1%)","1 (14.3%)",7],["ER+ve Her2+","0","0","1 (100%)","0",1],["Her2 +ve","4 (50%)","0","4 (50%)","0",8],["PR +ve","1 (50%)","1 (50%)","0","0",2],["PR+ve Her2+","1 (50%)","0","1 (50%)","0",2],["TNBC","1 (12.5%)","2 (25%)","3 (37.5%)","2 (25%)",8],["TPBC","4 (44.4%)","3 (33.3%)","0","2 (22.2%)",9],["Total","12 (32.4%)","7 (18.9%)","13 (35.1%)","5 (13.5%)",37]], chi:17.59,pv:0.48,sig:false },
    { t: "Hormone Status × Clinical Response", h: ["Hormone","Complete","Partial","Progressive","Stable","Total"],
      r: [["EP PR +ve","1 (14.3%)","2 (28.6%)","1 (14.3%)","3 (42.9%)",7],["ER+ve Her2+","0","1 (100%)","0","0",1],["Her2 +ve","2 (25%)","5 (62.5%)","0","1 (12.5%)",8],["PR +ve","1 (50%)","1 (50%)","0","0",2],["PR+ve Her2+","1 (50%)","1 (50%)","0","0",2],["TNBC","1 (12.5%)","4 (50%)","1 (12.5%)","2 (25%)",8],["TPBC","5 (55.6%)","2 (22.2%)","1 (11.1%)","1 (11.1%)",9],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]], chi:12.47,pv:0.82,sig:false },
    { t: "Biopsy × pCR", h: ["Biopsy Type","No","Yes","Total"],
      r: [["Adenoid Cystic Ca.","1 (100%)","0",1],["DCIS","1 (50%)","1 (50%)",2],["Inv. Ca. of Breast","17 (65.4%)","9 (34.6%)",26],["Inv. Ca. Sq. Diff.","1 (100%)","0",1],["Inv. Ductal Ca.","3 (60%)","2 (40%)",5],["Inv. Solid Pap. Ca.","2 (100%)","0",2],["Total","25 (67.6%)","12 (32.4%)",37]], chi:2.38,pv:0.79,sig:false },
    { t: "Biopsy × RCB Class", h: ["Biopsy","Class 0","Class I","Class II","Class III","Total"],
      r: [["Adenoid Cystic","0","0","1 (100%)","0",1],["DCIS","1 (50%)","1 (50%)","0","0",2],["Inv. Ca. Breast","9 (34.6%)","5 (19.2%)","9 (34.6%)","3 (11.5%)",26],["Inv. Ca. Sq.","0","0","1 (100%)","0",1],["Inv. Ductal Ca.","2 (40%)","1 (20%)","0","2 (40%)",5],["Inv. Solid Pap.","0","0","2 (100%)","0",2],["Total","12 (32.4%)","7 (18.9%)","13 (35.1%)","5 (13.5%)",37]], chi:14.13,pv:0.51,sig:false },
    { t: "Biopsy × Clinical Response", h: ["Biopsy","Complete","Partial","Progressive","Stable","Total"],
      r: [["Adenoid Cystic","0","1 (100%)","0","0",1],["DCIS","2 (100%)","0","0","0",2],["Inv. Ca. Breast","6 (23.1%)","13 (50%)","2 (7.7%)","5 (19.2%)",26],["Inv. Ca. Sq.","0","1 (100%)","0","0",1],["Inv. Ductal Ca.","3 (60%)","1 (20%)","0","1 (20%)",5],["Inv. Solid Pap.","0","0","1 (50%)","1 (50%)",2],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]], chi:17.40,pv:0.129,sig:false },
    { t: "RCB Class × Clinical Response ★", h: ["RCB Class","Complete","Partial","Progressive","Stable","Total"],
      r: [["Class 0","7 (58.3%)","3 (25%)","0 (0%)","2 (16.7%)",12],["Class I","2 (28.6%)","4 (57.1%)","0 (0%)","1 (14.3%)",7],["Class II","1 (7.7%)","9 (69.2%)","1 (7.7%)","2 (15.4%)",13],["Class III","1 (20%)","0 (0%)","2 (40%)","2 (40%)",5],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]], chi:20.20,pv:0.01,sig:true },
    { t: "pCR × Clinical Response ★", h: ["pCR","Complete","Partial","Progressive","Stable","Total"],
      r: [["No","4 (16%)","13 (52%)","3 (12%)","5 (20%)",25],["Yes","7 (58.3%)","3 (25%)","0 (0%)","2 (16.7%)",12],["Total","11 (29.7%)","16 (43.2%)","3 (8.1%)","7 (18.9%)",37]], chi:7.74,pv:0.05,sig:true },
    { t: "Clinical TNM × Biopsy ★", h: ["Association","χ²","P Value","Significance"],
      r: [["Clinical TNM Staging × Biopsy Histology","124.49","0.009","Significant"]], chi:124.49,pv:0.009,sig:true },
    { t: "Clinical TNM × RCB Class", h: ["Association","χ²","P Value","Significance"],
      r: [["Clinical TNM Staging × RCB Class","57.04","0.36","Not Significant"]], chi:57.04,pv:0.36,sig:false },
  ];

  // 8. Statistical Summary
  const allStats = [
    { t: "Age Group × pCR", chi: 3.10, p: 0.54, s: false },
    { t: "Age Group × RCB", chi: 14.89, p: 0.24, s: false },
    { t: "Age Group × Response", chi: 13.82, p: 0.31, s: false },
    { t: "Hormone × Laterality", chi: 5.17, p: 0.52, s: false },
    { t: "Hormone × Clinical Features", chi: 11.83, p: 0.45, s: false },
    { t: "Hormone × pCR", chi: 5.26, p: 0.51, s: false },
    { t: "Hormone × RCB", chi: 17.59, p: 0.48, s: false },
    { t: "Hormone × Response", chi: 12.47, p: 0.82, s: false },
    { t: "Biopsy × pCR", chi: 2.38, p: 0.79, s: false },
    { t: "Biopsy × RCB", chi: 14.13, p: 0.51, s: false },
    { t: "Biopsy × Response", chi: 17.40, p: 0.129, s: false },
    { t: "RCB × Response", chi: 20.20, p: 0.01, s: true },
    { t: "pCR × Response", chi: 7.74, p: 0.05, s: true },
    { t: "Clinical TNM × Biopsy", chi: 124.49, p: 0.009, s: true },
    { t: "Clinical TNM × RCB", chi: 57.04, p: 0.36, s: false },
  ];

  /* ════════════════════════════════════════════════════════
     COUNTERS — reset each render
  ════════════════════════════════════════════════════════ */
  let tblNum = 0;
  let figNum = 0;

  /* ════════════════════════════════════════════════════════
     COMPONENTS
  ════════════════════════════════════════════════════════ */
  const Tbl = (props: { headers: string[]; rows: any[][]; caption: string; chi?: number; pv?: number; sig?: boolean; small?: boolean }) => {
    const num = ++tblNum;
    return (
      <div style={{ marginBottom: 18, pageBreakInside: "avoid" }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Table {num}: {props.caption}</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: props.small ? 8 : 9 }}>
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              {props.headers.map((h: string, i: number) => (
                <th key={i} style={{ border: "1px solid #cbd5e1", padding: "4px 6px", textAlign: "left" as const, fontWeight: 700, color: "#1e293b" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.rows.map((r: any[], i: number) => (
              <tr key={i} style={{ background: i === props.rows.length - 1 ? "#f8fafc" : "white", fontWeight: i === props.rows.length - 1 ? 700 : 400 }}>
                {r.map((c: any, j: number) => (
                  <td key={j} style={{ border: "1px solid #e2e8f0", padding: "3px 6px", color: "#475569" }}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {props.chi !== undefined && (
          <p style={{ fontSize: 8, marginTop: 3, color: props.sig ? "#047857" : "#64748b", fontWeight: 600 }}>
            χ² = {props.chi}, P = {props.pv}, {props.sig ? "Statistically Significant" : "Statistically Not Significant"}
          </p>
        )}
      </div>
    );
  };

  const Fig = (props: { children: React.ReactNode; caption: string; h?: number }) => {
    const num = ++figNum;
    return (
      <div style={{ marginBottom: 20, pageBreakInside: "avoid" }}>
        <div style={{ height: props.h || 220, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">{props.children}</ResponsiveContainer>
        </div>
        <p style={{ fontSize: 8, color: "#64748b", textAlign: "center" as const, marginTop: 4, fontStyle: "italic" }}>Figure {num}: {props.caption}</p>
      </div>
    );
  };

  const PB = () => <div style={{ pageBreakAfter: "always" as const, height: 1 }} />;

  const Sec = (props: { num: number; title: string }) => (
    <div style={{ borderBottom: "2px solid #4f46e5", paddingBottom: 4, marginBottom: 14, marginTop: 24 }}>
      <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", margin: 0 }}>{props.num}. {props.title}</h2>
    </div>
  );

  // Reset counters
  tblNum = 0;
  figNum = 0;

  /* ════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════ */
  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 780, margin: "0 auto", padding: "30px 36px", color: "#1e293b", fontSize: 10, lineHeight: 1.5 }}>

      {/* ═══════════════ TITLE PAGE ═══════════════ */}
      <div style={{ textAlign: "center" as const, paddingTop: 60, paddingBottom: 40 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: 3, textTransform: "uppercase" as const, marginBottom: 20 }}>Thesis Statistics Report</p>
        <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.3, marginBottom: 16, color: "#0f172a" }}>
          Clinico-Pathological Correlation of Neoadjuvant Chemotherapy Outcomes in Invasive Breast Carcinoma
        </h1>
        <p style={{ fontSize: 12, color: "#64748b", marginBottom: 30 }}>Comprehensive Statistical Analysis of 37 Cases</p>
        <div style={{ display: "inline-block", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "12px 24px", fontSize: 9, color: "#475569", textAlign: "left" as const }}>
          <div><strong>Cohort:</strong> N = 37 | All Female | Single Lesion</div>
          <div><strong>Staging:</strong> AJCC 8th Edition</div>
          <div><strong>Response:</strong> RECIST 1.1 Criteria</div>
          <div><strong>Pathology:</strong> RCB Index Classification</div>
          <div><strong>Statistics:</strong> 15 Chi-Square Cross-tabulation Analyses</div>
          <div><strong>Contents:</strong> 31 Tables, 12 Figures, 8 Sections</div>
        </div>
      </div>
      <PB />


      {/* ═══════════════ SECTION 1: DEMOGRAPHICS ═══════════════ */}
      <Sec num={1} title="Baseline Demographics" />

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" as const }}>
        {[["Total Cases","37"],["Gender","100% Female"],["Mean Age","51.57 ± 10.23 yrs"],["Lesions","Single (100%)"],["Peak Age Group","41-50 yrs (37.8%)"]].map(([l,v],i) => (
          <div key={i} style={{ flex: "1 1 120px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "6px 10px", textAlign: "center" as const }}>
            <div style={{ fontSize: 7, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const }}>{l}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#1e293b" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Table 1 */}
      <Tbl caption="Age Distribution" headers={["Age Group","Frequency (n)","Percentage (%)"]}
        rows={[...age.map(d => [d.group, d.n, `${d.pct}%`]),["Total",37,"100.0%"]]} />

      {/* Figure 1 */}
      <Fig caption="Age Group Distribution (N=37)">
        <BarChart data={age} margin={{top:18,right:10,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="group" tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <Tooltip /><Bar dataKey="n" fill="#4f46e5" radius={[4,4,0,0]} name="Count" label={{position:"top",fontSize:7,fill:"#334155",fontWeight:700} as any} />
        </BarChart>
      </Fig>

      {/* Table 2 */}
      <Tbl caption="Laterality Distribution" headers={["Laterality","Frequency (n)","Percentage (%)"]}
        rows={[...lat.map(d => [d.name, d.n, `${d.pct}%`]),["Total",37,"100.0%"]]} />

      {/* Figure 2 */}
      <Fig caption="Breast Laterality" h={220}>
        <PieChart>
          <Pie data={lat} cx="50%" cy="45%" innerRadius={40} outerRadius={65} paddingAngle={5} dataKey="n"
            label={({cx,cy,midAngle,innerRadius,outerRadius,n,pct}: any) => {
              const r = innerRadius + (outerRadius - innerRadius) * 1.8;
              const x = cx + r * Math.cos(-midAngle * Math.PI / 180);
              const y = cy + r * Math.sin(-midAngle * Math.PI / 180);
              return <text x={x} y={y} fill="#334155" textAnchor="middle" dominantBaseline="central" style={{fontSize:8,fontWeight:700}}>{n} ({pct}%)</text>;
            }} labelLine={{stroke:"#94a3b8",strokeWidth:0.5}}>
            <Cell fill="#4f46e5" /><Cell fill="#ec4899" />
          </Pie>
          <Tooltip formatter={(v: any, name: any, props: any) => [`${v} (${props.payload.pct}%)`, name]} />
          <Legend verticalAlign="bottom" height={30} wrapperStyle={{fontSize:8}} />
        </PieChart>
      </Fig>

      <PB />


      {/* ═══════════════ SECTION 2: CLINICAL PROFILE ═══════════════ */}
      <Sec num={2} title="Clinical Profile" />

      {/* Table 3 */}
      <Tbl caption="Clinical Features at Presentation" headers={["Feature","Frequency (n)","Percentage (%)"]}
        rows={[...clin.map(d => [d.feature, d.n, `${d.pct}%`]),["Total",37,"100.0%"]]} />

      {/* Table 4 */}
      <Tbl caption="Single Largest Tumor Diameter (cm)" headers={["Phase","Mean","SD","Min","Max"]}
        rows={diam.map(d => [d.phase, d.mean, d.sd, d.min, d.max])} />

      {/* Figure 3 */}
      <Fig caption="Mean Tumor Diameter: Pre vs Post Chemotherapy">
        <BarChart data={diam} margin={{top:18,right:10,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="phase" tick={{fontSize:9}} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize:8}} axisLine={false} tickLine={false} domain={[0,6]} />
          <Tooltip /><Bar dataKey="mean" fill="#4f46e5" radius={[4,4,0,0]} name="Mean cm" label={{position:"top",fontSize:7,fill:"#334155",fontWeight:700} as any} />
        </BarChart>
      </Fig>

      {/* Table 5 */}
      <Tbl caption="Tumor Diameter by Hormone Status (Pre vs Post)" headers={["Hormone Status","Pre Mean","Pre SD","Post Mean","Post SD"]} small
        rows={[["EP PR +ve",3.586,1.7497,2.657,2.1938],["ER+ve Her2 +ve",8.190,"—",4.000,"—"],["Her2 +ve",4.886,1.7268,1.663,1.0514],["PR +ve",3.850,0.2121,0.500,0.7071],["PR +ve Her2 +ve",7.100,6.2225,2.350,3.3234],["TNBC",4.850,2.4030,3.588,2.6068],["TPBC",3.700,1.2952,1.200,1.6117]]} />

      {/* Figure 4 */}
      <Fig caption="Diameter by Hormone Status (Pre vs Post)">
        <BarChart data={diamH} margin={{top:18,right:10,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{fontSize:7}} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <Tooltip /><Legend wrapperStyle={{fontSize:8}} />
          <Bar dataKey="pre" fill="#f43f5e" name="Pre-Chemo" radius={[3,3,0,0]} label={{position:"top",fontSize:6,fill:"#be123c",fontWeight:600} as any} />
          <Bar dataKey="post" fill="#10b981" name="Post-Chemo" radius={[3,3,0,0]} label={{position:"top",fontSize:6,fill:"#047857",fontWeight:600} as any} />
        </BarChart>
      </Fig>

      {/* Table 6 */}
      <Tbl caption="Tumor Diameter by Biopsy Histology (Pre vs Post)" headers={["Biopsy Type","Pre Mean","Pre SD","Post Mean","Post SD"]} small
        rows={[["Adenoid Cystic Ca.",7.000,"—",4.800,"—"],["DCIS",4.700,1.4142,0.000,0.0000],["Inv. Ca. of Breast",3.988,1.7892,1.881,1.6546],["Inv. Ca. Sq. Diff.",11.500,"—",4.700,"—"],["Inv. Ductal Ca.",5.160,1.9204,1.900,2.2760],["Inv. Solid Pap. Ca.",4.500,3.5355,6.600,0.2828]]} />

      {/* Figure 5 */}
      <Fig caption="Diameter by Biopsy Type (Pre vs Post)">
        <BarChart data={diamB} margin={{top:18,right:10,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{fontSize:7}} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <Tooltip /><Legend wrapperStyle={{fontSize:8}} />
          <Bar dataKey="pre" fill="#6366f1" name="Pre-Chemo" radius={[3,3,0,0]} label={{position:"top",fontSize:6,fill:"#4338ca",fontWeight:600} as any} />
          <Bar dataKey="post" fill="#06b6d4" name="Post-Chemo" radius={[3,3,0,0]} label={{position:"top",fontSize:6,fill:"#0e7490",fontWeight:600} as any} />
        </BarChart>
      </Fig>

      <PB />


      {/* ═══════════════ SECTION 3: BIOLOGICAL PROFILING ═══════════════ */}
      <Sec num={3} title="Biological Profiling" />

      {/* Table 7 */}
      <Tbl caption="Hormone & Receptor Status (7 Categories)" headers={["Subtype","Frequency (n)","Percentage (%)"]}
        rows={[...hormone.map(d => [d.name, d.n, `${d.pct}%`]),["Total",37,"100.0%"]]} />

      {/* Figure 6 */}
      <Fig caption="Molecular Subtype Distribution">
        <BarChart data={hormone} layout="vertical" margin={{top:5,right:30,left:5,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis type="number" tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" width={100} tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <Tooltip /><Bar dataKey="n" fill="#8b5cf6" radius={[0,4,4,0]} name="Count" label={{position:"right",fontSize:7,fill:"#334155",fontWeight:700} as any} />
        </BarChart>
      </Fig>

      {/* Table 8 */}
      <Tbl caption="Biopsy Histology (6 Types)" headers={["Histology","Frequency (n)","Percentage (%)"]}
        rows={[...biopsy.map(d => [d.type, d.n, `${d.pct}%`]),["Total",37,"100.0%"]]} />

      {/* Figure 7 */}
      <Fig caption="Biopsy Subtype Distribution" h={220}>
        <BarChart data={biopsy} margin={{top:18,right:10,left:0,bottom:5}} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis type="number" tick={{fontSize:7}} axisLine={false} tickLine={false} />
          <YAxis dataKey="type" type="category" width={160} tick={{fontSize:7}} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v: any, name: any, props: any) => [`${v} (${props.payload.pct}%)`, "Count"]} />
          <Bar dataKey="n" radius={[0,4,4,0]} name="Count" label={{position:"right",fontSize:7,fill:"#334155",fontWeight:700} as any}>
            {biopsy.map((_: any, i: number) => <Cell key={i} fill={C[i]} />)}
          </Bar>
        </BarChart>
      </Fig>

      <PB />


      {/* ═══════════════ SECTION 4: TNM STAGING ═══════════════ */}
      <Sec num={4} title="TNM Staging" />

      {/* Table 9 */}
      <Tbl caption="Clinical TNM Staging — Pre-Treatment (19 Categories)" headers={["TNM Stage","n","(%)"]} small
        rows={[...tnmPre.map(d => [d.s, d.n, `${d.p}%`]),["Total",37,"100.0%"]]} />

      {/* Figure 8 */}
      <Fig caption="Clinical TNM Staging Distribution" h={220}>
        <BarChart data={tnmPre} margin={{top:18,right:5,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="s" tick={{fontSize:6} as any} axisLine={false} tickLine={false} height={50} interval={0} />
          <YAxis tick={{fontSize:7}} axisLine={false} tickLine={false} />
          <Tooltip /><Bar dataKey="n" fill="#f59e0b" radius={[3,3,0,0]} label={{position:"top",fontSize:6,fill:"#92400e",fontWeight:700} as any} />
        </BarChart>
      </Fig>

      <PB />

      {/* Table 10 */}
      <Tbl caption="Post-Surgical TN Staging (17 Categories)" headers={["YP Stage","n","(%)"]} small
        rows={[...tnmPost.map(d => [d.s, d.n, `${d.p}%`]),["Total",37,"100.0%"]]} />

      {/* Figure 9 */}
      <Fig caption="Post-Surgical TN Staging Distribution" h={220}>
        <BarChart data={tnmPost} margin={{top:18,right:5,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="s" tick={{fontSize:6} as any} axisLine={false} tickLine={false} height={50} interval={0} />
          <YAxis tick={{fontSize:7}} axisLine={false} tickLine={false} />
          <Tooltip /><Bar dataKey="n" fill="#10b981" radius={[3,3,0,0]} label={{position:"top",fontSize:6,fill:"#065f46",fontWeight:700} as any} />
        </BarChart>
      </Fig>

      <PB />


      {/* ═══════════════ SECTION 5: TREATMENT RESPONSE ═══════════════ */}
      <Sec num={5} title="Treatment Response" />

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" as const }}>
        {[["Overall Response Rate","72.9%"],["Complete Response","29.7% (n=11)"],["Partial Response","43.2% (n=16)"],["Non-Responders","27.0% (n=10)"]].map(([l,v],i) => (
          <div key={i} style={{ flex: "1 1 140px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "6px 10px", textAlign: "center" as const }}>
            <div style={{ fontSize: 7, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const }}>{l}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#1e293b" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Table 11 */}
      <Tbl caption="Axillary Lymph Nodes — Pre-Chemotherapy" headers={["Status","n","(%)"]}
        rows={[["No",9,"24.3%"],["Yes",28,"75.7%"],["Total",37,"100.0%"]]} />

      {/* Table 12 */}
      <Tbl caption="Axillary Lymph Nodes — Post-Chemotherapy" headers={["Status","n","(%)"]}
        rows={[["No",25,"67.6%"],["Yes",12,"32.4%"],["Total",37,"100.0%"]]} />

      {/* Figure 10 */}
      <Fig caption="Axillary Nodal Conversion (Pre vs Post)">
        <BarChart data={[{phase:"Pre-Chemo",Positive:28,Negative:9},{phase:"Post-Chemo",Positive:12,Negative:25}]} margin={{top:18,right:10,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="phase" tick={{fontSize:9}} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <Tooltip /><Legend wrapperStyle={{fontSize:8}} />
          <Bar dataKey="Positive" fill="#f43f5e" radius={[3,3,0,0]} label={{position:"top",fontSize:7,fill:"#be123c",fontWeight:700} as any} />
          <Bar dataKey="Negative" fill="#10b981" radius={[3,3,0,0]} label={{position:"top",fontSize:7,fill:"#047857",fontWeight:700} as any} />
        </BarChart>
      </Fig>

      <p style={{ fontSize: 9, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6, padding: "6px 10px", color: "#92400e", marginBottom: 14 }}>
        <strong>Nodal Conversion Rate:</strong> 16 of 28 node-positive patients (57.1%) converted to node-negative post-NAC.
      </p>

      {/* Table 13 */}
      <Tbl caption="RECIST 1.1 Clinical Response Categories" headers={["Category","Response","n","(%)"]}
        rows={[["Responders","Complete Response",11,"29.7%"],["Responders","Partial Response",16,"43.2%"],["Non-Responders","Progressive Disease",3,"8.1%"],["Non-Responders","Stable Disease",7,"18.9%"],["","Total",37,"100.0%"]]} />

      {/* Figure 11 */}
      <Fig caption="Clinical Response Breakdown (RECIST 1.1)">
        <BarChart data={resp} margin={{top:18,right:10,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{fontSize:8}} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <Tooltip /><Bar dataKey="n" radius={[4,4,0,0]} name="Count" label={{position:"top",fontSize:7,fill:"#334155",fontWeight:700} as any}>
            {resp.map((_: any, i: number) => <Cell key={i} fill={i < 2 ? "#10b981" : "#f43f5e"} />)}
          </Bar>
        </BarChart>
      </Fig>

      <PB />


      {/* ═══════════════ SECTION 6: PATHOLOGICAL OUTCOMES ═══════════════ */}
      <Sec num={6} title="Pathological Outcomes" />

      {/* Table 14 */}
      <Tbl caption="Pathological Complete Response (pCR)" headers={["pCR","n","(%)"]}
        rows={[["No",25,"67.6%"],["Yes",12,"32.4%"],["Total",37,"100.0%"]]} />

      {/* Table 15 */}
      <Tbl caption="Residual Cancer Burden (RCB) Classification" headers={["RCB Class","n","(%)","Interpretation"]}
        rows={[["Class 0 (pCR)",12,"32.4%","Complete response"],["Class I",7,"18.9%","Minimal residual"],["Class II",13,"35.1%","Moderate residual"],["Class III",5,"13.5%","Extensive residual"],["Total",37,"100.0%",""]]} />

      {/* Figure 12 */}
      <Fig caption="RCB Class Distribution">
        <BarChart data={rcb} margin={{top:18,right:10,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize:8}} axisLine={false} tickLine={false} />
          <Tooltip /><Bar dataKey="n" radius={[4,4,0,0]} name="Count" label={{position:"top",fontSize:7,fill:"#334155",fontWeight:700} as any}>
            {rcb.map((_: any, i: number) => <Cell key={i} fill={["#10b981","#06b6d4","#f59e0b","#f43f5e"][i]} />)}
          </Bar>
        </BarChart>
      </Fig>

      <PB />


      {/* ═══════════════ SECTION 7: CROSS-TABULATIONS ═══════════════ */}
      <Sec num={7} title="Cross-Tabulation Analyses (Chi-Square Tests)" />
      <p style={{ fontSize: 9, color: "#64748b", marginBottom: 14 }}>
        All 15 chi-square tests of association are presented below (Tables 16–30). ★ denotes statistically significant results (P ≤ 0.05).
      </p>

      {/* Tables 16–30 */}
      {crossTabs.map((ct, i) => (
        <div key={i}>
          <Tbl caption={ct.t} headers={ct.h} rows={ct.r} chi={ct.chi} pv={ct.pv} sig={ct.sig} small />
          {(i === 4 || i === 8 || i === 11) && <PB />}
        </div>
      ))}

      <PB />


      {/* ═══════════════ SECTION 8: STATISTICAL SUMMARY ═══════════════ */}
      <Sec num={8} title="Complete Statistical Summary" />

      {/* Table 31 */}
      <Tbl caption="Master Table — All Chi-Square Tests (N=15)" headers={["#","Association Tested","χ²","P Value","Result"]}
        rows={allStats.map((s, i) => [i+1, s.t, s.chi, s.p, s.s ? "✓ Significant" : "Not Significant"])} />

      <div style={{ display: "flex", gap: 10, marginTop: 16, marginBottom: 16, flexWrap: "wrap" as const }}>
        <div style={{ flex: "1 1 200px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 8, padding: 12 }}>
          <p style={{ fontSize: 8, fontWeight: 800, color: "#047857", textTransform: "uppercase" as const, marginBottom: 6 }}>Significant Associations (3/15)</p>
          {allStats.filter(s => s.s).map((s, i) => (
            <p key={i} style={{ fontSize: 8, color: "#065f46", margin: "2px 0" }}><strong>{s.t}</strong> — χ²={s.chi}, P={s.p}</p>
          ))}
        </div>
        <div style={{ flex: "1 1 200px", background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 8, padding: 12 }}>
          <p style={{ fontSize: 8, fontWeight: 800, color: "#4338ca", textTransform: "uppercase" as const, marginBottom: 6 }}>Key Outcome Metrics</p>
          <p style={{ fontSize: 8, color: "#3730a3", margin: "2px 0" }}>pCR Rate: <strong>32.4%</strong> (12/37)</p>
          <p style={{ fontSize: 8, color: "#3730a3", margin: "2px 0" }}>ORR (CR+PR): <strong>72.9%</strong> (27/37)</p>
          <p style={{ fontSize: 8, color: "#3730a3", margin: "2px 0" }}>Nodal Conversion: <strong>57.1%</strong> (16/28)</p>
          <p style={{ fontSize: 8, color: "#3730a3", margin: "2px 0" }}>Mean Diameter Reduction: <strong>51.2%</strong></p>
        </div>
      </div>

      {/* FINAL INTERPRETATIONS */}
      <div style={{ background: "#1e1b4b", borderRadius: 12, padding: 20, color: "white", marginTop: 20, pageBreakInside: "avoid" }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>Final Interpretations</h3>
        <div style={{ fontSize: 9, lineHeight: 1.7, color: "#c7d2fe" }}>
          <p style={{ marginBottom: 8 }}><strong style={{ color: "white" }}>1. Clinical Predictability:</strong> RECIST response categories significantly predict final pathological burden. RCB Class 0 patients had 58.3% complete clinical response vs 7.7% in Class II (χ²=20.20, P=0.01). pCR also significantly correlated with clinical response (χ²=7.74, P=0.05).</p>
          <p style={{ marginBottom: 8 }}><strong style={{ color: "white" }}>2. Staging–Histology Correlation:</strong> Clinical TNM staging showed highly significant association with biopsy histology (χ²=124.49, P=0.009), indicating invasive carcinoma variants correlate with specific staging patterns.</p>
          <p style={{ marginBottom: 8 }}><strong style={{ color: "white" }}>3. Nodal Impact:</strong> NAC achieved 57.1% nodal conversion (16/28 → node-negative), substantially reducing surgical burden.</p>
          <p style={{ marginBottom: 8 }}><strong style={{ color: "white" }}>4. Non-Significant Predictors:</strong> Age (P=0.54), hormone receptor status (P=0.51), laterality, and biopsy histology were not individually significant predictors of pCR or RCB in this cohort. The small sample size (N=37) may limit power to detect moderate associations.</p>
          <p><strong style={{ color: "white" }}>5. Tumor Size Reduction:</strong> Mean diameter decreased from 4.49 ± 2.19 cm to 2.19 ± 2.06 cm (51.2%). PR +ve subtype showed greatest reduction (87%), while invasive solid papillary carcinoma paradoxically increased (4.5 → 6.6 cm).</p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center" as const, marginTop: 30, paddingTop: 14, borderTop: "1px solid #e2e8f0" }}>
        <p style={{ fontSize: 7, fontWeight: 800, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase" as const }}>
          End of Report • NAC Study • N=37 • 31 Tables • 12 Figures • 15 Chi-Square Analyses • AJCC 8th Ed. • RECIST 1.1 • RCB Index
        </p>
      </div>
    </div>
  );
}