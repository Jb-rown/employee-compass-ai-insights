import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Employee } from "@/types/database";
import { toast } from "sonner";

interface PredictionResult {
  employee_id: string;
  name: string;
  department: string;
  risk_score: number;
  prediction: "At Risk" | "Safe";
  probability: number;
}

const PredictRetention = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictionResults, setPredictionResults] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    satisfaction_level: "",
    evaluation_score: "",
    department: "",
  });

  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('department')
          .not('department', 'is', null);
        
        if (error) throw error;
        const uniqueDepartments = [...new Set(data.map(emp => emp.department))];
        return uniqueDepartments.filter(Boolean);
      } catch (error) {
        console.error("Error fetching departments:", error);
        return [];
      }
    }
  });

  const handleSinglePrediction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock prediction API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResult: PredictionResult = {
        employee_id: formData.employee_id,
        name: "John Doe", // This would come from the API
        department: formData.department,
        risk_score: Math.random() * 100,
        prediction: Math.random() > 0.5 ? "At Risk" : "Safe",
        probability: Math.random() * 100,
      };
      
      setPredictionResults([mockResult]);
      toast.success("Prediction completed successfully");
    } catch (error) {
      console.error("Error making prediction:", error);
      toast.error("Failed to make prediction");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchPrediction = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock batch prediction API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults: PredictionResult[] = Array.from({ length: 5 }, (_, i) => ({
        employee_id: `EMP${i + 1}`,
        name: `Employee ${i + 1}`,
        department: departments?.[i % departments.length] || "Unknown",
        risk_score: Math.random() * 100,
        prediction: Math.random() > 0.5 ? "At Risk" : "Safe",
        probability: Math.random() * 100,
      }));
      
      setPredictionResults(mockResults);
      toast.success("Batch prediction completed successfully");
    } catch (error) {
      console.error("Error making batch prediction:", error);
      toast.error("Failed to process batch prediction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <NavBar />
      <DashboardLayout>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Predict Retention</h1>
        </div>

        <Tabs defaultValue="single" className="space-y-6">
          <TabsList>
            <TabsTrigger value="single">Single Employee Prediction</TabsTrigger>
            <TabsTrigger value="batch">Batch Prediction</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single">
            <Card>
              <CardHeader>
                <CardTitle>Predict Employee Retention</CardTitle>
                <CardDescription>
                  Enter employee details to predict their retention risk
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSinglePrediction} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee_id">Employee ID</Label>
                      <Input
                        id="employee_id"
                        value={formData.employee_id}
                        onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                        placeholder="Enter employee ID"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="satisfaction_level">Satisfaction Level (0-1)</Label>
                      <Input
                        id="satisfaction_level"
                        type="number"
                        min="0"
                        max="1"
                        step="0.01"
                        value={formData.satisfaction_level}
                        onChange={(e) => setFormData({ ...formData, satisfaction_level: e.target.value })}
                        placeholder="0.0 - 1.0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="evaluation_score">Evaluation Score (0-1)</Label>
                      <Input
                        id="evaluation_score"
                        type="number"
                        min="0"
                        max="1"
                        step="0.01"
                        value={formData.evaluation_score}
                        onChange={(e) => setFormData({ ...formData, evaluation_score: e.target.value })}
                        placeholder="0.0 - 1.0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => setFormData({ ...formData, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments?.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Predicting..." : "Predict Retention"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="batch">
            <Card>
              <CardHeader>
                <CardTitle>Batch Prediction</CardTitle>
                <CardDescription>
                  Upload a CSV file with employee data for bulk predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="max-w-md"
                    />
                    <Button 
                      onClick={handleBatchPrediction}
                      disabled={!selectedFile || isLoading}
                    >
                      {isLoading ? "Processing..." : "Process Batch"}
                    </Button>
                  </div>
                  
                  {selectedFile && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileSpreadsheet size={16} />
                      <span>{selectedFile.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {predictionResults.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Prediction</TableHead>
                    <TableHead>Probability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predictionResults.map((result) => (
                    <TableRow key={result.employee_id}>
                      <TableCell>{result.employee_id}</TableCell>
                      <TableCell>{result.name}</TableCell>
                      <TableCell>{result.department}</TableCell>
                      <TableCell>{result.risk_score.toFixed(1)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {result.prediction === "At Risk" ? (
                            <AlertCircle className="text-red-500" size={16} />
                          ) : (
                            <CheckCircle2 className="text-green-500" size={16} />
                          )}
                          <span className={result.prediction === "At Risk" ? "text-red-500" : "text-green-500"}>
                            {result.prediction}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{result.probability.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </DashboardLayout>
      <Footer />
    </div>
  );
};

export default PredictRetention; 