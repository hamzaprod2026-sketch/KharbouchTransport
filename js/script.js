
const header=document.querySelector(".site-header");
const menu=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
const topButton=document.querySelector(".back-top");
window.addEventListener("scroll",()=>{
  header?.classList.toggle("scrolled",window.scrollY>20);
  topButton?.classList.toggle("show",window.scrollY>450);
});
menu?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",String(open));
  menu.textContent=open?"✕":"☰";
});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");menu?.setAttribute("aria-expanded","false");if(menu)menu.textContent="☰";
}));
topButton?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const form=document.querySelector("#contact-form");
form?.addEventListener("submit",event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const subject=encodeURIComponent("Demande de contact – Kharbouch Transport");
  const body=encodeURIComponent(
`Nom : ${data.get("name")}
E-mail : ${data.get("email")}
Téléphone : ${data.get("phone")||"Non renseigné"}
Sujet : ${data.get("subject")}

Message :
${data.get("message")}`);
  const status=form.querySelector(".form-status");
  status.textContent="Votre application e-mail va s'ouvrir pour envoyer votre demande. Configurez l'adresse de réception avant la mise en ligne.";
  window.location.href=`mailto:CONTACT@KHARBOUCH-TRANSPORT.MA?subject=${subject}&body=${body}`;
});
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
