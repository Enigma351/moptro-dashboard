import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '@/services/apiClient';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';

type Author = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  organization: string;
  status: 'Online' | 'Offline';
  employedDate: string;
};

type Project = {
  _id: string;
  name: string;
  logo: string;
  budget: string;
  status: 'Working' | 'Done' | 'Canceled';
  completion: number;
};

export default function TablesPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsData, projectsData] = await Promise.all([
          apiFetch('/dashboard/authors'),
          apiFetch('/dashboard/projects')
        ]);
        setAuthors(authorsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching table data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-white/60 animate-pulse font-black uppercase tracking-widest text-xs">
          Synchronizing Ledger Data…
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Authors Table */}
      <Card variant="glass" className="overflow-hidden">
        <CardTitle className="p-6 pb-2">Authors Table</CardTitle>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 uppercase tracking-widest text-[10px] text-white/40">
                  <th className="px-6 py-4 font-bold">Author</th>
                  <th className="px-6 py-4 font-bold">Function</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Employed</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={author.image} 
                          alt={author.name} 
                          className="w-10 h-10 rounded-xl object-cover border border-white/10"
                        />
                        <div className="flex flex-col">
                          <Typography variant="small" className="font-bold text-white leading-tight">{author.name}</Typography>
                          <Typography variant="small" className="text-white/40 text-[11px]">{author.email}</Typography>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-bold text-white/80 leading-tight">{author.role}</Typography>
                        <Typography variant="small" className="text-white/40 text-[11px]">{author.organization}</Typography>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                        author.status === 'Online' 
                          ? "bg-[#01b574]/10 text-[#01b574] border-[#01b574]/20" 
                          : "bg-white/10 text-white/40 border-white/10"
                      )}>
                        {author.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Typography variant="small" className="font-bold text-white/60">{author.employedDate}</Typography>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-white/40 hover:text-[#0075FF] transition-colors p-2 rounded-lg hover:bg-white/5">
                        <Typography variant="small" className="font-bold">Edit</Typography>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card variant="glass" className="overflow-hidden">
        <CardTitle className="p-6 pb-2">Projects Table</CardTitle>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 uppercase tracking-widest text-[10px] text-white/40">
                  <th className="px-6 py-4 font-bold">Project</th>
                  <th className="px-6 py-4 font-bold">Budget</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Completion</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
                          <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                        </div>
                        <Typography variant="small" className="font-bold text-white">{project.name}</Typography>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Typography variant="small" className="font-bold text-white/80">{project.budget}</Typography>
                    </td>
                    <td className="px-6 py-4">
                      <Typography variant="small" className="font-bold text-white/60 text-[11px] uppercase tracking-wider">{project.status}</Typography>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2 w-32">
                        <div className="flex justify-between items-center">
                          <Typography variant="small" className="text-[10px] font-black text-[#0075FF]">{project.completion}%</Typography>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${project.completion}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={cn(
                              "h-full rounded-full",
                              project.completion === 100 ? "bg-[#01b574]" : "bg-[#0075FF]"
                            )}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-white/40 hover:text-white transition-colors p-2">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
