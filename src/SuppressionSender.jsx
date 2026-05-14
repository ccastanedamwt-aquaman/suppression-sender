// SuppressionSender.jsx — Standalone Alarm Suppression Email Tool
// McMillan Water Treatment · AquaField Suite
// Works on Android Chrome — no ?. or ?? operators
import { useState, useEffect } from "react";
var FONT_URL = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap";
var CSS = "\n@import url('" + FONT_URL + "');\n*{box-sizing:border-box;margin:0;padding:0;}\nbody{background:#080808;color:#e8e8e8;font-family:'IBM Plex Sans',sans-serif;}\n\n.ob-wrap{min-height:100vh;background:#080808;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 20px;}\n.ob-card{width:100%;max-width:400px;background:#0e0e0e;border:1px solid #1e1e1e;border-radius:18px;padding:32px 24px 28px;}\n\n.ob-title{font-size:22px;font-weight:700;color:#f0f0f0;text-align:center;margin-bottom:4px;}\n.ob-sub{font-size:13px;color:#888;text-align:center;margin-bottom:28px;font-family:'IBM Plex Mono',monospace;}\n.ob-label{font-size:10px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:1.5px;font-family:'IBM Plex Mono',monospace;margin-bottom:8px;display:block;}\n.ob-input{width:100%;padding:13px 16px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;color:#f0f0f0;font-family:'IBM Plex Sans',sans-serif;font-size:15px;outline:none;-webkit-appearance:none;margin-bottom:18px;}\n.ob-input:focus{border-color:#3b82f6;}\n.ob-hint{font-size:11px;color:#555;font-family:'IBM Plex Mono',monospace;margin-top:-14px;margin-bottom:18px;}\n.ob-btn{width:100%;padding:16px;background:#3b82f6;border:none;border-radius:12px;color:#080808;font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:16px;cursor:pointer;margin-top:6px;-webkit-tap-highlight-color:transparent;}\n.ob-btn:disabled{background:#2a2a2a;color:#555;cursor:not-allowed;}\n\n.app{min-height:100vh;background:#080808;padding-bottom:60px;}\n.hdr{background:#0d0d0d;border-bottom:1px solid #1a1a1a;padding:14px 16px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:50;}\n\n.hdr-title{font-size:16px;font-weight:700;color:#f0f0f0;flex:1;}\n.hdr-who{font-size:11px;color:#888;font-family:'IBM Plex Mono',monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px;}\n\n.content{padding:16px;}\n\n.sec{background:#0e0e0e;border:1px solid #1a1a1a;border-radius:12px;padding:16px;margin-bottom:12px;}\n.sec-label{font-size:10px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:1.5px;font-family:'IBM Plex Mono',monospace;margin-bottom:10px;}\n\n.chain-row{display:flex;gap:8px;}\n.chain-btn{flex:1;padding:12px 8px;border-radius:10px;border:1px solid #1e1e1e;background:#1a1a1a;color:#888;font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:14px;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:all .15s;}\n.chain-btn.active{border-color:#3b82f644;background:#3b82f612;color:#3b82f6;}\n\n.field-input{width:100%;padding:12px 14px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;color:#f0f0f0;font-family:'IBM Plex Sans',sans-serif;font-size:15px;outline:none;-webkit-appearance:none;}\n.field-input:focus{border-color:#3b82f6;}\n\n.dur-row{display:flex;gap:6px;}\n.dur-btn{flex:1;padding:10px 4px;border-radius:8px;border:1px solid #252525;background:#1e1e1e;color:#888;font-family:'IBM Plex Mono',monospace;font-size:14px;font-weight:700;cursor:pointer;-webkit-tap-highlight-color:transparent;text-align:center;}\n.dur-btn.active{border-color:#3b82f644;background:#3b82f612;color:#3b82f6;}\n\n.time-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-top:1px solid #1a1a1a;margin-top:8px;}\n.time-label{font-size:11px;color:#666;font-family:'IBM Plex Mono',monospace;}\n.time-val{font-size:12px;color:#f0f0f0;font-family:'IBM Plex Mono',monospace;}\n\n.send-btn{width:100%;padding:18px;border:none;border-radius:14px;font-family:'IBM Plex Sans',sans-serif;font-weight:700;font-size:17px;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .2s;}\n.send-btn.ready{background:#3b82f6;color:#080808;}\n.send-btn.done{background:#4ade80;color:#080808;}\n.send-btn.disabled{background:#2a2a2a;color:#555;cursor:not-allowed;}\n\n.test-toggle{background:transparent;border:none;cursor:pointer;font-size:10px;font-family:'IBM Plex Mono',monospace;letter-spacing:.4px;padding:2px 0;-webkit-tap-highlight-color:transparent;}\n.test-toggle.on{color:#f0f0f0;}\n.test-toggle.off{color:#333;}\n\n.preview-box{background:#1a1a1a;border:1px solid #222;border-radius:10px;padding:14px;font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.9;color:#aab;white-space:pre-wrap;word-break:break-word;}\n\n.settings-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid #1a1a1a;margin-top:4px;}\n.settings-link{font-size:11px;color:#555;font-family:'IBM Plex Mono',monospace;cursor:pointer;-webkit-tap-highlight-color:transparent;text-decoration:underline;}\n.settings-link:hover{color:#888;}\n\n.tag-green{display:inline-block;background:#4ade8022;border:1px solid #4ade8044;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;color:#4ade80;font-family:'IBM Plex Mono',monospace;margin-left:8px;}\n.tag-red{display:inline-block;background:#3b82f622;border:1px solid #3b82f644;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;color:#3b82f6;font-family:'IBM Plex Mono',monospace;}\n\n.loc-btn{padding:8px 12px;border-radius:8px;border:1px solid #252525;background:#1e1e1e;color:#888;font-family:'IBM Plex Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:all .15s;}\n.loc-btn.active{border-color:#3b82f644;background:#3b82f612;color:#3b82f6;}\n.loc-btn-del{padding:4px 8px;border-radius:6px;border:1px solid #ef444433;background:#1a0606;color:#ef4444;font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:700;cursor:pointer;-webkit-tap-highlight-color:transparent;margin-left:6px;}\n.loc-add-row{display:flex;gap:6px;margin-top:8px;}\n.loc-add-input{flex:1;padding:8px 12px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;color:#f0f0f0;font-family:'IBM Plex Sans',sans-serif;font-size:13px;outline:none;}\n.loc-add-input:focus{border-color:#3b82f6;}\n.loc-add-btn{padding:8px 14px;border-radius:8px;border:none;background:#3b82f6;color:#080808;font-family:'IBM Plex Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;}\n";
var STORAGE_KEY = "sup_sender_profile";
var LOCATIONS_KEY = "sup_sender_locations";
function fmtDateTime(d) {
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var h = d.getHours();
  var m = d.getMinutes();
  var ampm = h >= 12 ? "PM" : "AM";
  var h12 = h % 12;
  if (h12 === 0) h12 = 12;
  var ms = m < 10 ? "0" + m : String(m);
  return days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " · " + h12 + ":" + ms + " " + ampm;
}
function loadProfile() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return null;
}
function saveProfile(p) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch(e) {}
}
function loadLocations() {
  try {
    var raw = localStorage.getItem(LOCATIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return [];
}
function saveLocationsData(locs) {
  try {
    localStorage.setItem(LOCATIONS_KEY, JSON.stringify(locs));
  } catch(e) {}
}
// ——— ONBOARDING ———
function Onboarding(props) {
  var [name, setName] = useState("");
  var [phone, setPhone] = useState("");
  var [testEmail, setTestEmail] = useState("");
  var canSave = name.trim() && phone.trim();
  function handleSave() {
    if (!canSave) return;
    var profile = { name: name.trim(), phone: phone.trim(), email: testEmail.trim() };
    saveProfile(profile);
    props.onDone(profile);
  }
  return (
    <div className="ob-wrap">
      <div className="ob-card">
        <div className="ob-title">Suppression Sender</div>
        <div className="ob-sub">alarm suppression · NSRM@wal-mart.com</div>
        <label className="ob-label">Your Name</label>
        <input className="ob-input" type="text" placeholder="Carlos Castañeda" value={name}
          onChange={function(e) { setName(e.target.value); }} />
        <label className="ob-label">Contact Phone (digits only)</label>
        <input className="ob-input" type="tel" placeholder="9093688500" value={phone}
          onChange={function(e) { setPhone(e.target.value); }} />
        <div className="ob-hint">Appears in email body as Contact #</div>
        <label className="ob-label">Your Email <span style={{color:"#555",fontWeight:400}}>(for test sends)</span></label>
        <input className="ob-input" type="email" placeholder="you@example.com" value={testEmail}
          onChange={function(e) { setTestEmail(e.target.value); }} />
        <button className="ob-btn" disabled={!canSave} onClick={handleSave}>
          Get Started →
        </button>
      </div>
    </div>
  );
}
// ——— MAIN APP ———
function SuppressionApp(props) {
  var profile = props.profile;
  var [chain, setChain] = useState("Walmart");
  var [storeNum, setStoreNum] = useState("");
  var [cityState, setCityState] = useState("");
  var [hours, setHours] = useState(4);
  var [reason, setReason] = useState("Routine water treatment service");
  var [racks, setRacks] = useState("");
  var [testMode, setTestMode] = useState(false);
  var [sent, setSent] = useState(false);
  var [showSettings, setShowSettings] = useState(false);

  // Saved locations
  var [savedLocs, setSavedLocs] = useState(loadLocations());
  var [showLocManage, setShowLocManage] = useState(false);
  var [newLocInput, setNewLocInput] = useState("");

  function addLocation() {
    if (!newLocInput.trim()) return;
    var updated = savedLocs.concat([newLocInput.trim()]);
    setSavedLocs(updated);
    saveLocationsData(updated);
    setNewLocInput("");
  }

  function removeLocation(idx) {
    var updated = savedLocs.filter(function(_, i) { return i !== idx; });
    setSavedLocs(updated);
    saveLocationsData(updated);
  }

  function buildBody() {
    var now = new Date();
    var end = new Date(now.getTime() + hours * 3600000);
    return (
      "Store Info\n" +
      "Store #: " + storeNum + "\n" +
      "Chain: " + chain + "\n" +
      "City & State: " + (cityState || "___") + "\n\n" +
      "Technician Info\n" +
      "Name: " + profile.name + "\n" +
      "Contact #: " + profile.phone + "\n\n" +
      "Suppression Info\n" +
      "Rack/Case #: " + (racks.trim() || "All racks") + "\n" +
      "Start Date & Time: " + fmtDateTime(now) + "\n" +
      "End Date & Time: " + fmtDateTime(end) + "\n\n" +
      "Reason\n" +
      reason
    );
  }
  function buildPreview() {
    var now = new Date();
    var end = new Date(now.getTime() + hours * 3600000);
    return (
      "Store Info\n" +
      "Store #: " + (storeNum || "___") + "\n" +
      "Chain: " + chain + "\n" +
      "City & State: " + (cityState || "___") + "\n\n" +
      "Technician Info\n" +
      "Name: " + profile.name + "\n" +
      "Contact #: " + profile.phone + "\n\n" +
      "Suppression Info\n" +
      "Rack/Case #: " + (racks.trim() || "All racks") + "\n" +
      "Start Date & Time: " + fmtDateTime(now) + "\n" +
      "End Date & Time: " + fmtDateTime(end) + "\n\n" +
      "Reason\n" +
      reason
    );
  }
  function send() {
    if (!storeNum.trim()) return;
    var to = testMode ? profile.email : "NSRM@wal-mart.com";
    var subj = "Alarm Suppression Request — " + chain + " #" + storeNum;
    var body = buildBody();
    var link = "mailto:" + to + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
    window.location.href = link;
    setSent(true);
    setTimeout(function() { setSent(false); }, 4000);
  }
  var now = new Date();
  var endTime = new Date(now.getTime() + hours * 3600000);
  if (showSettings) {
    return <SettingsPage profile={profile} onBack={function() { setShowSettings(false); }} onUpdate={props.onProfileUpdate} />;
  }
  return (
    <div className="app">
      <div className="hdr">
        <div className="hdr-title">Suppression Sender</div>
        <div className="hdr-who">{profile.name}</div>
      </div>
      <div className="content">
        {/* CHAIN */}
        <div className="sec">
          <div className="sec-label">Chain</div>
          <div className="chain-row">
            {["Walmart","Sam's Club"].map(function(c) {
              return (
                <button key={c} className={"chain-btn" + (chain === c ? " active" : "")}
                  onClick={function() { setChain(c); }}>
                  {c}
                </button>
              );
            })}
          </div>
        </div>
        {/* STORE NUMBER */}
        <div className="sec">
          <div className="sec-label">Store Number</div>
          <input className="field-input" type="number" inputMode="numeric" placeholder="e.g. 1584"
            value={storeNum} onChange={function(e) { setStoreNum(e.target.value); }} />
        </div>
        {/* CITY & STATE */}
        <div className="sec">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div className="sec-label" style={{marginBottom:0}}>City &amp; State</div>
            <button
              style={{background:"transparent",border:"none",color:showLocManage ? "#3b82f6" : "#444",fontSize:10,fontFamily:"'IBM Plex Mono',monospace",cursor:"pointer",WebkitTapHighlightColor:"transparent",padding:"2px 0"}}
              onClick={function() { setShowLocManage(function(v) { return !v; }); }}>
              {showLocManage ? "done" : "manage"}
            </button>
          </div>
          {/* Quick-select location buttons */}
          {savedLocs.length > 0 && (
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {savedLocs.map(function(loc, i) {
                var isActive = cityState === loc;
                return (
                  <div key={i} style={{display:"flex",alignItems:"center"}}>
                    <button className={"loc-btn" + (isActive ? " active" : "")}
                      onClick={function() { setCityState(loc); }}>
                      {loc}
                    </button>
                    {showLocManage && (
                      <button className="loc-btn-del" onClick={function() { removeLocation(i); }}>✕</button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {/* Add new location row (visible in manage mode) */}
          {showLocManage && (
            <div className="loc-add-row">
              <input className="loc-add-input" type="text" placeholder="e.g. Las Vegas, NV"
                value={newLocInput}
                onChange={function(e) { setNewLocInput(e.target.value); }}
                onKeyDown={function(e) { if (e.key === "Enter") addLocation(); }} />
              <button className="loc-add-btn" onClick={addLocation}>+</button>
            </div>
          )}
          {/* Manual input always visible */}
          {!showLocManage && (
            <input className="field-input" type="text" placeholder="Las Vegas, NV"
              value={cityState} onChange={function(e) { setCityState(e.target.value); }} />
          )}
        </div>
        {/* DURATION */}
        <div className="sec">
          <div className="sec-label">Duration</div>
          <div className="dur-row">
            {[1,2,3,4,6,8].map(function(h) {
              return (
                <button key={h} className={"dur-btn" + (hours === h ? " active" : "")}
                  onClick={function() { setHours(h); }}>
                  {h}h
                </button>
              );
            })}
          </div>
          <div className="time-row">
            <span className="time-label">Start</span>
            <span className="time-val">{fmtDateTime(now)}</span>
          </div>
          <div className="time-row" style={{borderTop:"none",paddingTop:4}}>
            <span className="time-label">End</span>
            <span className="time-val" style={{color:"#3b82f6"}}>{fmtDateTime(endTime)}</span>
          </div>
        </div>
        {/* REASON */}
        <div className="sec">
          <div className="sec-label">Reason</div>
          <input className="field-input" type="text" value={reason}
            onChange={function(e) { setReason(e.target.value); }} />
        </div>
        {/* RACK / CASE # */}
        <div className="sec">
          <div className="sec-label">Rack / Case # <span style={{color:"#555",fontWeight:400}}>(optional)</span></div>
          <input className="field-input" type="text" placeholder="All racks" value={racks}
            onChange={function(e) { setRacks(e.target.value); }} />
        </div>
        {/* SEND */}
        <div className="sec">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:11,color:"#666",fontFamily:"'IBM Plex Mono',monospace"}}>
              To: {testMode ? <span style={{color:"#fbbf24"}}>{profile.email}</span> : <span style={{color:"#3b82f6"}}>NSRM@wal-mart.com</span>}
            </div>
            <button className={"test-toggle " + (testMode ? "on" : "off")}
              onClick={function() { setTestMode(function(v) { return !v; }); }}>
              {testMode ? " test mode on" : "test mode"}
            </button>
          </div>
          <button
            className={"send-btn " + (sent ? "done" : (storeNum.trim() ? "ready" : "disabled"))}
            onClick={send}
            disabled={!storeNum.trim()}>
            {sent ? "Email App Opened!" : testMode ? "Send Test to " + profile.email : "Send to NSRM@wal-mart.com"}
          </button>
          {sent && <div style={{textAlign:"center",marginTop:10,fontSize:11,color:"#4ade80",fontFamily:"'IBM Plex Mono',monospace"}}>Email client opened — complete & send from there</div>}
        </div>
        {/* PREVIEW */}
        <div className="sec">
          <div className="sec-label" style={{marginBottom:10}}>Preview</div>
          <div className="preview-box">{buildPreview()}</div>
        </div>
        {/* FOOTER / SETTINGS LINK */}
        <div className="settings-row">
          <span style={{fontSize:11,color:"#444",fontFamily:"'IBM Plex Mono',monospace"}}>
            Sending as: {profile.name}
          </span>
          <span className="settings-link" onClick={function() { setShowSettings(true); }}>
            settings edit profile
          </span>
        </div>
      </div>
    </div>
  );
}
// ——— SETTINGS PAGE ———
function SettingsPage(props) {
  var p = props.profile;
  var [name, setName] = useState(p.name || "");
  var [phone, setPhone] = useState(p.phone || "");
  var [email, setEmail] = useState(p.email || "");
  var [saved, setSaved] = useState(false);
  function handleSave() {
    var updated = { name: name.trim(), phone: phone.trim(), email: email.trim() };
    saveProfile(updated);
    props.onUpdate(updated);
    setSaved(true);
    setTimeout(function() { setSaved(false); props.onBack(); }, 1200);
  }
  return (
    <div className="app">
      <div className="hdr">
        <button onClick={props.onBack}
          style={{background:"transparent",border:"none",color:"#3b82f6",fontFamily:"'IBM Plex Sans',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",padding:"6px 0",marginRight:4,WebkitTapHighlightColor:"transparent"}}>
          ← Back
        </button>
        <div className="hdr-title">Settings</div>
      </div>
      <div className="content">
        <div className="sec">
          <label className="sec-label">Name</label>
          <input className="field-input" type="text" value={name}
            onChange={function(e) { setName(e.target.value); }} />
        </div>
        <div className="sec">
          <label className="sec-label">Contact Phone</label>
          <input className="field-input" type="tel" value={phone}
            onChange={function(e) { setPhone(e.target.value); }} />
        </div>
        <div className="sec">
          <label className="sec-label">Test Email</label>
          <input className="field-input" type="email" value={email}
            onChange={function(e) { setEmail(e.target.value); }} />
        </div>
        <button
          className={"send-btn " + (saved ? "done" : "ready")}
          onClick={handleSave}
          style={{marginTop:8}}>
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
// ——— ROOT ———
export default function SuppressionSender() {
  var [profile, setProfile] = useState(loadProfile());
  if (!profile) {
    return (
      <>
        <style>{CSS}</style>
        <Onboarding onDone={function(p) { setProfile(p); }} />
      </>
    );
  }
  return (
    <>
      <style>{CSS}</style>
      <SuppressionApp
        profile={profile}
        onProfileUpdate={function(p) { setProfile(p); }}
      />
    </>
  );
}
