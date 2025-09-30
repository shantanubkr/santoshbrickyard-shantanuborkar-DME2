# Santosh’s Brickyard - Project Documentation

## Overview
Santosh’s Brickyard is a narrative-driven, choice-based management game with light mini-games.  
Players step into the shoes of Santosh, a fabrication worker turned brickyard entrepreneur, facing real-world challenges like production, labour, clients, finance, and digital transformation.  

The game is designed in **React + Tailwind CSS**, with a **Minecraft/pixel-inspired aesthetic**.  
Core loop: choices → stat changes → branching events → ending → replay.

---

## Stats
- **Cash 💰**
- **Bricks 🧱**
- **Eco Score 🌱**
- **Reputation ⭐**
- **Demand 📈**
- **Production Capacity ⚒️**

Stats are displayed in the top corners with icons and color-coded bars.

---

## Storyline & Event Flow

### Introductory Scene
- Santosh: *“I spent 29 years in fabrication. Then 2 years ago, I saw a YouTube short on making bricks. I thought, why not try?”*  
- Worker interrupts: *“Santosh bhau! We’re out of stock, what should we do?”*  
- → Activates **Brick-Making Event #1**

---

### Core Event Loop (Modular Chain)

#### 1. Brick-Making Event
- Player chooses brick type: **Clay, Fly Ash, Cement.**  
- Each option shows:
  - Cost  
  - Eco impact  
  - Reputation effect  
  - Demand %  
- Choice updates stats.  
- → Next: **Client Event**

---

#### 2. Client Event
- Client type is random: **Small Builder or Big Contractor.**  
- Options:
  - Negotiate  
  - Accept Standard Deal  
  - Reject  
- Outcomes affect cash, reputation, demand.  
- Branch:
  - Success → **Labour Event**  
  - Failure → **Digitization Event**

---

#### 3. Labour Event
- Options:
  - Retain Old Labour (bonuses, lower risk)  
  - Hire New Workers (costlier but more capacity)  
  - Let Them Leave (risk production drop)  
- Affects Production Capacity, Cash, Reputation (worker morale).  
- Branch:
  - Stable → back to **Brick-Making Event**  
  - Unstable → **Random Trouble Event**

---

#### 4. Digitization Event
- Options:
  - Business Webpage  
  - IndiaMart  
  - Both  
  - None  
- Costs cash but increases demand + reputation.  
- Branch:
  - Success → better **Client Event** outcomes  
  - Failure → **Finance Event**

---

#### 5. Finance Event
- Options:
  - Take Small Loan  
  - Take Big Loan  
  - Avoid Loan  
- Loans boost cash but trigger **Repayment Event** later with reputation risk.  
- Branch:
  - Loan taken → repayment event randomly later  
  - No loan → continue normal flow

---

#### 6. Random Trouble Events
Triggered post **Labour** or **Digitization** events. Examples:
- Rain disrupts production  
- Market crash lowers selling price  
- Machinery breakdown (repair cost)  
- Eco-regulation tightening (eco score penalty)  

---

### Final Evaluation
Triggered after **4–6 cycles**:

- **Success Ending**  
  - Eco > 70, cash surplus, stable labour, high rep → thriving brickyard  
- **Struggle Ending**  
  - Eco/reputation 40–70, limited cash, unstable labour → surviving but uncertain  
- **Failure Ending**  
  - Eco < 40, negative cash, low rep < 40 → brickyard shuts down  
- Show **Restart option**

---

## Narrative & Thematic Flow
- Economic pressure & rainfall → modelled via Labour & Trouble events  
- Social dynamics → influence reputation via labour + client choices  
- Digital transformation → boosts growth but at a cost  
- Outcomes → Growth, Survival, or Decline based on cumulative stats  

---

## Visuals
- **Backgrounds**: Brick Yard, Client Site, Office, Labour Quarters, Website Launch, Rainy Day Trouble.  
- **Characters (sprites with headshots)**:
  - Santosh (happy, sad, angry)  
  - Workers (group)  
  - CA (accountant)  
  - Sons (2 individual, 1 together)  
  - Client (builder/contractor)  
  - Tech Salesperson  
  - Casual side character (flex slot)  
- **Dialogue**: Bottom RPG-style text box. Speaker sprite appears on left/right.  

---

## Replayability & Modularity
- Event order can change with randomness.  
- Random Trouble ensures unpredictability.  
- Easy to add new modules (e.g. festivals, new clients).  

---

## Development Notes
- Built in **React + Tailwind CSS**  
- Event system modular (JSON config in `events.ts`)  
- Components:  
  - `Game.tsx` (state machine)  
  - `DialogBox.tsx` (RPG-style UI)  
  - `StatsBar.tsx`  
  - `ChoiceButtons.tsx`  
  - `MiniGames/` (BrickCard, NegotiationSlider, etc.)  

---
