import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, X, Image as ImageIcon, Check } from "lucide-react";
import { portfolio as portfolioDB } from "../../../lib/db";
import type { CustomProject, DefaultEdit } from "../../../lib/db";

const DEFAULT_PROJECTS = [
  { id: 1,  title: "LED Signages",         category: "led",         description: "Vibrant multi-color LED signage with dynamic lighting" },
  { id: 2,  title: "Outdoor Hoardings",    category: "branding",    description: "Large-scale billboard advertising for maximum visibility" },
  { id: 3,  title: "Back Light Signage",   category: "illuminated", description: "Professional backlit signage for Auto Touch salon" },
  { id: 4,  title: "Front Light Signage",  category: "illuminated", description: "Front-lit commercial signage for retail stores" },
  { id: 5,  title: "Vinyl Branding",       category: "branding",    description: "Large format vinyl graphics for walls and windows" },
  { id: 6,  title: "ACP Signage",          category: "specialty",   description: "Premium aluminum composite panel storefront entrance" },
  { id: 7,  title: "Neon Boards",          category: "led",         description: "Colorful neon signage with vibrant glow effects" },
  { id: 8,  title: "Acrylic Signage",      category: "specialty",   description: "Modern acrylic signs for retail branding" },
  { id: 9,  title: "Metal Letters",        category: "specialty",   description: "Premium 3D steel/brass/titanium dimensional letters" },
  { id: 10, title: "Digital Signages",     category: "led",         description: "Dynamic digital display screens with live content" },
  { id: 11, title: "Election Banners",     category: "branding",    description: "Large-scale political campaign banners" },
  { id: 12, title: "Menu Boards",          category: "illuminated", description: "Illuminated menu boards for restaurants" },
  { id: 13, title: "Vehicle Signages",     category: "branding",    description: "Eye-catching mobile branding for promotional vehicles" },
  { id: 14, title: "Flex Printing",        category: "print",       description: "High-quality flex banner printing machine" },
  { id: 15, title: "Eco Solvent Printing", category: "print",       description: "Eco-friendly large format printing technology" },
  { id: 16, title: "Exhibition Stalls",    category: "specialty",   description: "Custom exhibition booth for trade shows" },
  { id: 17, title: "Business Cards",       category: "print",       description: "Premium business card printing" },
  { id: 18, title: "Pamphlets & Flyers",   category: "print",       description: "Professional pamphlet and brochure printing" },
];

const CATEGORIES = [
  { id: "led", label: "LED & Digital" }, { id: "illuminated", label: "Illuminated Signs" },
  { id: "branding", label: "Branding & Graphics" }, { id: "print", label: "Print Materials" },
  { id: "specialty", label: "Specialty" },
];

const EMPTY_FORM = { title: "", category: "led", description: "", image_url: "" };

export function AdminPortfolio() {
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const [defaultEdits, setDefaultEdits] = useState<Record<number, DefaultEdit>>({});
  const [customProjects, setCustomProjects] = useState<CustomProject[]>([]);
  const [filterCat, setFilterCat] = useState("all");
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [editingCustomId, setEditingCustomId] = useState<number | null>(null);
  const [editingDefaultId, setEditingDefaultId] = useState<number | null>(null);
  const [defaultEditForm, setDefaultEditForm] = useState({ title: "", description: "", category: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await portfolioDB.uploadImage(file);
      setForm(f => ({ ...f, image_url: url }));
    } catch (err) {
      alert("Failed to upload image. Please make sure you have run the Storage Bucket SQL command.");
    } finally {
      setUploading(false);
    }
  };

  const reload = async () => {
    const [hidden, edits, custom] = await Promise.all([
      portfolioDB.getHiddenIds(), portfolioDB.getDefaultEdits(), portfolioDB.getCustom(),
    ]);
    setHiddenIds(hidden); setDefaultEdits(edits); setCustomProjects(custom); setLoading(false);
  };
  useEffect(() => { reload(); }, []);

  const flashSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 1800); };

  const handleSaveCustom = async () => {
    if (!form.title || !form.category) return;
    if (editingCustomId !== null) await portfolioDB.updateCustom(editingCustomId, form);
    else await portfolioDB.addCustom({ title: form.title, category: form.category, description: form.description, image_url: form.image_url });
    setForm({ ...EMPTY_FORM }); setEditingCustomId(null); setShowAddForm(false);
    await reload(); flashSaved();
  };

  const handleEditCustom = (p: CustomProject) => {
    setForm({ title: p.title, category: p.category, description: p.description ?? "", image_url: p.image_url ?? "" });
    setEditingCustomId(p.id); setShowAddForm(true);
  };

  const handleDeleteCustom = async (id: number) => { if (confirm("Delete this project?")) { await portfolioDB.deleteCustom(id); reload(); } };
  const toggleHide = async (id: number) => { if (hiddenIds.includes(id)) await portfolioDB.showDefault(id); else await portfolioDB.hideDefault(id); reload(); };

  const startEditDefault = (id: number) => {
    const base = DEFAULT_PROJECTS.find(p => p.id === id)!;
    const edits = defaultEdits[id] || {};
    setDefaultEditForm({ title: edits.title || base.title, description: edits.description || base.description, category: edits.category || base.category });
    setEditingDefaultId(id);
  };

  const saveDefaultEdit = async () => {
    if (editingDefaultId === null) return;
    await portfolioDB.editDefault(editingDefaultId, defaultEditForm);
    setEditingDefaultId(null); await reload(); flashSaved();
  };

  const visibleDefaults = DEFAULT_PROJECTS.filter(p => filterCat === "all" || p.category === filterCat);
  const visibleCustom = customProjects.filter(p => filterCat === "all" || p.category === filterCat);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-outfit mb-1">Portfolio Manager</h1>
          <p className="text-gray-400 text-sm">{DEFAULT_PROJECTS.length - hiddenIds.length} default + {customProjects.length} custom = {DEFAULT_PROJECTS.length - hiddenIds.length + customProjects.length} visible</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/15 border border-green-500/30 rounded-lg text-green-400 text-xs font-medium"><Check className="w-3 h-3" /> Saved</motion.div>}
          <button onClick={() => { setShowAddForm(true); setEditingCustomId(null); setForm({ ...EMPTY_FORM }); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-black text-sm font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[{ id: "all", label: "All Categories" }, ...CATEGORIES].map(c => (
          <button key={c.id} onClick={() => setFilterCat(c.id)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filterCat === c.id ? "bg-primary text-black shadow-[0_0_12px_rgba(212,175,55,0.3)]" : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"}`}>{c.label}</button>
        ))}
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-black/50 border border-primary/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{editingCustomId !== null ? "Edit Project" : "Add New Project"}</h3>
                <button onClick={() => { setShowAddForm(false); setEditingCustomId(null); }} className="text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5 font-medium">Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Custom Billboard" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5 font-medium">Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-4 py-2.5 bg-[#111] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-colors">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5 font-medium">Description</label>
                  <input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short project description" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5 font-medium">Project Image</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {form.image_url && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black/50">
                        <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 w-full relative">
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/webp" 
                        onChange={handleImageUpload} 
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" 
                      />
                      <div className={`w-full px-4 py-4 bg-white/5 border border-white/10 border-dashed rounded-xl flex items-center justify-center gap-2 transition-all ${uploading ? 'opacity-50' : 'hover:bg-white/10 hover:border-primary/50'}`}>
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-300 font-medium">
                          {uploading ? "Uploading to Cloud..." : "Click or drag to upload image (PNG, JPG)"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Recommended: 1200x800px or larger. Max 5MB.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleSaveCustom} 
                  disabled={uploading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black text-sm font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />{editingCustomId !== null ? "Update Project" : "Add to Portfolio"}
                </button>
                <button onClick={() => { setShowAddForm(false); setEditingCustomId(null); }} className="px-5 py-2.5 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl hover:bg-white/10 transition-colors">Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <>
          {visibleCustom.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Custom Projects ({visibleCustom.length})</h2>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {visibleCustom.map(p => (
                  <motion.div key={p.id} layout className="bg-black/40 border border-white/8 rounded-2xl overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="h-36 bg-white/5 relative overflow-hidden">
                      {p.image_url ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-gray-700" /></div>}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute bottom-2 left-3 text-xs px-2 py-0.5 bg-black/60 rounded-full text-primary border border-primary/20">{CATEGORIES.find(c => c.id === p.category)?.label || p.category}</span>
                    </div>
                    <div className="p-4">
                      <p className="text-white text-sm font-semibold mb-1">{p.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{p.description}</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => handleEditCustom(p)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 hover:text-white transition-colors"><Pencil className="w-3 h-3" /> Edit</button>
                        <button onClick={() => handleDeleteCustom(p.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 hover:bg-red-500/20 transition-colors"><Trash2 className="w-3 h-3" /> Delete</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Default Projects ({visibleDefaults.length})</h2>
            <div className="space-y-2">
              {visibleDefaults.map(p => {
                const edits = defaultEdits[p.id] || {};
                const isHidden = hiddenIds.includes(p.id);
                const isEditing = editingDefaultId === p.id;
                return (
                  <motion.div key={p.id} layout className={`bg-black/40 border rounded-xl p-4 transition-all ${isHidden ? "border-white/5 opacity-40" : "border-white/8 hover:border-white/15"}`}>
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="grid md:grid-cols-2 gap-3">
                          <input type="text" value={defaultEditForm.title} onChange={e => setDefaultEditForm(f => ({ ...f, title: e.target.value }))} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary/50" />
                          <select value={defaultEditForm.category} onChange={e => setDefaultEditForm(f => ({ ...f, category: e.target.value }))} className="px-3 py-2 bg-[#111] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary/50">
                            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                          </select>
                          <input type="text" value={defaultEditForm.description} onChange={e => setDefaultEditForm(f => ({ ...f, description: e.target.value }))} className="md:col-span-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary/50" />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={saveDefaultEdit} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors"><Save className="w-3 h-3" /> Save</button>
                          <button onClick={() => setEditingDefaultId(null)} className="px-3 py-1.5 bg-white/5 text-gray-400 text-xs rounded-lg hover:bg-white/10 transition-colors">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-600 w-6 text-right">{p.id}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-white">{edits.title || p.title}</p>
                            {edits.title && <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">edited</span>}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{edits.description || p.description}</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-white/5 border border-white/8 rounded-full text-gray-500 whitespace-nowrap">{CATEGORIES.find(c => c.id === (edits.category || p.category))?.label}</span>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => startEditDefault(p.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                          <button onClick={() => toggleHide(p.id)} className={`p-1.5 rounded-lg transition-all ${isHidden ? "text-green-400 hover:bg-green-500/10" : "text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10"}`} title={isHidden ? "Show" : "Hide"}>
                            {isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
