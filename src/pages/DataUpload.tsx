
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, FileText, AlertCircle, Check } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DataUpload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is a CSV or Excel file
      const validTypes = [
        'text/csv', 
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Please select a CSV or Excel file");
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate file parsing and processing
      await simulateFileProcessing();
      
      // In a real implementation, you would parse the CSV/Excel file here
      // and insert the data into the employees table
      
      // Record the upload in the database
      const { error } = await supabase
        .from('data_uploads')
        .insert({
          user_id: user.id,
          filename: file.name,
          row_count: Math.floor(Math.random() * 100) + 10, // Mock row count
          status: 'completed'
        });
      
      if (error) throw error;
      
      toast.success("Data uploaded successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload data");
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  // Simulate file processing with progress
  const simulateFileProcessing = async () => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <NavBar />
      <DashboardLayout>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Upload Employee Data</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Data</CardTitle>
              <CardDescription>
                Upload your employee data file to analyze retention risks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isUploading ? (
                <div className="space-y-4">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Processing file: {uploadProgress}%
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-12 text-center ${
                      file ? 'border-primary' : 'border-muted-foreground/20'
                    }`}
                  >
                    {file ? (
                      <div className="flex flex-col items-center gap-2">
                        <FileText size={48} className="text-primary" />
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFile(null)}
                          className="mt-2"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload size={48} className="text-muted-foreground/60" />
                        <p className="font-medium">Drag and drop your file here</p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse
                        </p>
                        <input
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleUpload} 
                      disabled={!file}
                      className="w-full sm:w-auto"
                    >
                      Upload and Process Data
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
              <CardDescription>
                Follow these guidelines for best results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Supported file formats</p>
                    <p className="text-sm text-muted-foreground">
                      CSV, Excel (.xlsx, .xls)
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Required columns</p>
                    <p className="text-sm text-muted-foreground">
                      First Name, Last Name, Department, Position, Hire Date
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Optional columns</p>
                    <p className="text-sm text-muted-foreground">
                      Email, Salary, Performance Score, Satisfaction Score
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Data protection</p>
                    <p className="text-sm text-muted-foreground">
                      All data is encrypted and stored securely. Only you can access your uploaded employee data.
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 rounded-md bg-muted p-4">
                <h3 className="font-medium mb-2">Sample template</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Download our sample template to ensure your data is formatted correctly.
                </p>
                <Button variant="outline" size="sm">
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
      <Footer />
    </div>
  );
};

export default DataUpload;
