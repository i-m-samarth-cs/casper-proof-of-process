# 🎮 **Simple Demo Guide**

## **🚀 Quick Start (2 minutes)**

### **Step 1: Start the App**
```bash
npm run dev
```

### **Step 2: Create a Workflow**

1. **Go to**: http://localhost:3000
2. **Click the step type buttons** on the left to add nodes:
   - Click **"Start"** to add a start node
   - Click **"Approval"** to add an approval node  
   - Click **"End"** to add an end node

3. **You should see**: Colorful nodes appear on the canvas that you can drag around

### **Step 3: Configure Nodes (Optional)**
- **Click on any node** to open the properties panel
- **Edit the name**, description, roles, SLA
- **Click "Save Changes"**

### **Step 4: Validate Workflow**
- **Click "Validate Workflow"** button (top right)
- **Should show**: ✅ "Validation Successful" message

### **Step 5: Deploy to Casper**
- **Click "Publish to Casper"** button (top right)
- **Watch**: Progressive toast messages showing deployment
- **Result**: "Successfully Published!" with contract address

---

## **🐛 Troubleshooting**

### **"Workflow creation not working"**
- Make sure you're clicking the colored step buttons on the LEFT side
- Look for: Start (green), Approval (blue), Review (purple), etc.
- Nodes should appear in the main canvas area

### **"Validation always failing"**
- Add at least 1 node first
- Make sure nodes have names (click node → edit name → save)
- For multi-step workflows, add both Start and End nodes

### **"Upload to Casper not working"**
- First validate the workflow (must show green checkmark)
- Check browser console (F12) for error messages
- Make sure API routes are working

### **"Nothing happens when clicking buttons"**
- Check browser console (F12) for JavaScript errors
- Make sure Next.js dev server is running
- Try refreshing the page

---

## **✅ Expected Behavior**

### **Workflow Creation**:
- Click step buttons → Nodes appear on canvas
- Drag nodes around to arrange them
- Click nodes to edit properties

### **Validation**:
- With 1+ named nodes → ✅ Success
- With unnamed nodes → ❌ "All nodes must have names"
- With duplicate names → ❌ "All step names must be unique"

### **Deployment**:
- After successful validation → Button enabled
- Click publish → Progressive toasts
- Final result → Contract address shown

---

## **🎯 Demo Script**

**"Let me show you our blockchain workflow designer..."**

1. **"First, I'll create a simple approval workflow"**
   - Click Start → Click Approval → Click End
   - "See how easy it is to design workflows visually"

2. **"Now I'll configure the approval step"**
   - Click the Approval node
   - Change name to "Manager Approval"
   - Set role to "Manager"
   - Set SLA to 48 hours
   - Click Save Changes

3. **"Let's validate this workflow"**
   - Click Validate Workflow
   - "The system checks for completeness and compliance"
   - Show green checkmark

4. **"Now I'll deploy this to the Casper blockchain"**
   - Click Publish to Casper
   - "Watch as it converts to smart contract format"
   - "Deploys to Casper Network for immutable verification"
   - Show success message with contract address

5. **"The workflow is now live on blockchain"**
   - "Anyone can verify the process rules"
   - "All executions will be permanently recorded"

**Total demo time: 2-3 minutes** ⏱️

---

## **🚨 If Still Not Working**

Run this debug command:
```bash
# Check if all files exist
npm run dev
# Open browser console (F12)
# Look for error messages
# Check Network tab for failed API calls
```

**Common fixes:**
- Restart the dev server: `Ctrl+C` then `npm run dev`
- Clear browser cache: `Ctrl+Shift+R`
- Check for TypeScript errors in terminal
- Verify all dependencies installed: `npm install`

**The workflow designer should work immediately with these fixes!** 🚀
