import Header from "@/components/Header";
import { DollarSign, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
}

export default function FinancialManagement() {
  const { t } = useTranslation();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const addExpense = () => {
    if (amount && description && date) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        amount: parseFloat(amount),
        description,
        date,
      };
      setExpenses([...expenses, newExpense]);
      setAmount("");
      setDescription("");
      setDate("");
    }
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("financial.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("financial.subtitle")}
              </p>
            </div>
          </div>

          {/* Total Expenses Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border mb-6">
            <p className="text-sm text-muted-foreground mb-1">
              {t("financial.totalExpenses")}
            </p>
            <h2 className="text-4xl font-bold text-foreground">
              ₹{totalExpenses.toFixed(2)}
            </h2>
          </div>

          {/* Add Expense Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t("financial.addExpense")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("financial.amount")}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("financial.description")}
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("financial.descriptionPlaceholder")}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("financial.date")}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <button
              onClick={addExpense}
              className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t("financial.addButton")}
            </button>
          </div>

          {/* Expenses List */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t("financial.expenseHistory")}
            </h3>
            {expenses.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {t("financial.noExpenses")}
              </p>
            ) : (
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {expense.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-foreground">
                        ₹{expense.amount.toFixed(2)}
                      </p>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
