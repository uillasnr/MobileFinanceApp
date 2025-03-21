import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { MonthSelector } from "@/src/components/MonthSelector";
import { MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import TransactionCard from "@/src/components/transactionCard";
import { TransactionProps, TransactionType } from "@/src/types/transaction";
import DetailsTransaction from "@/src/components/Details-Transaction";
import { getTransaction } from "@/src/services/api";
import Loading from "@/src/components/loading";

type Section = { title: string; data: TransactionProps[] };
const groupTransactionsByMonth = (transactions: TransactionProps[]) => {
    const grouped: Section[] = [];
    const months: { [key: string]: TransactionProps[] } = {};

    transactions.forEach((transaction: TransactionProps) => {
        const transactionDate = new Date(transaction.date);
        const monthNumber = transactionDate.getMonth(); // Mês numérico (0-11)
        const year = transactionDate.getFullYear();

        const monthLabel = transactionDate.toLocaleString("pt-BR", {
            month: "long",
            year: "numeric",
        });

        if (!months[monthLabel]) months[monthLabel] = [];
        months[monthLabel].push(transaction);
    });

    // Converter para array e ordenar
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const sortedMonths = Object.entries(months)
        .map(([title, data]) => {
            const firstTransactionDate = new Date(data[0].date);
            return {
                title,
                data,
                year: firstTransactionDate.getFullYear(),
                month: firstTransactionDate.getMonth(),
            };
        })
        .sort((a, b) => {
            if (a.year === currentYear && a.month === currentMonth) return -1; // Prioriza o mês atual
            if (b.year === currentYear && b.month === currentMonth) return 1;
            if (a.year !== b.year) return b.year - a.year; // Ordena por ano decrescente
            return b.month - a.month; // Ordena por mês decrescente
        });

    return sortedMonths;
};


export default function Transactions() {
    const [allTransactions, setAllTransactions] = useState<TransactionProps[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionProps | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const fetchedTransactions = await getTransaction();

                let filteredTransactions = fetchedTransactions.filter((transaction: TransactionProps) => {
                    const date = new Date(transaction.date);
                    return !isNaN(date.getTime());
                });

                filteredTransactions = filteredTransactions.map(
                    (transaction: TransactionProps) => ({
                        ...transaction,
                        type: transaction.type || TransactionType.EXPENSE,
                    })
                );

                setAllTransactions(filteredTransactions);
            } catch (error) {
                console.error("Erro ao buscar transações:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const filteredTransactions = useMemo(() => {
        let transactionsToFilter = [...allTransactions];
        if (selectedMonth !== null && selectedYear !== null) {
            transactionsToFilter = transactionsToFilter.filter((transaction: TransactionProps) => {
                const transactionDate = new Date(transaction.date);
                return (
                    transactionDate.getMonth() === selectedMonth &&
                    transactionDate.getFullYear() === selectedYear
                );
            });
        }
        console.log(transactionsToFilter)
        return groupTransactionsByMonth(transactionsToFilter);
    }, [allTransactions, selectedMonth, selectedYear]);

    const renderSection = useCallback(({ item: section }: { item: Section }) => { // Tipagem adicionada aqui
     /*  CARD */
        return (
            <View className="bg-card-dark mx-2 px-3 rounded-lg mb-4" key={section.title}>
                <Text className="text-lg font-subtitle text-white py-3 pl-0">{section.title}</Text>
                <FlatList
                    data={section.data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setSelectedTransaction(item)}>
                            <TransactionCard
                                title={item.title}
                                category={item.categoryId}
                                amount={item.type === "expense" ? -Math.abs(item.amount) : Math.abs(item.amount)}
                                type={item.type}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-background-dark">
                <Loading visible={loading} />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background-dark">
            {/* Header */}
            <View className="h-28 p-2 rounded-b-lg  bg-card-dark w-full mb-4 ">
                <Text className="text-2xl font-bold text-white text-center">
                    Transações
                </Text>
                <View className="flex-row justify-between items-center">
                    <MonthSelector
                        onMonthChange={(month, year) => {
                            setSelectedMonth(month);
                            setSelectedYear(year);
                        }}
                        useAsInput={false}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMonth(null);
                            setSelectedYear(null);
                        }}
                        className="p-2 bg-red-600 h-10 w-24 rounded-lg flex-row justify-center items-center"
                    >
                        <MaterialCommunityIcons
                            name="filter-remove"
                            size={24}
                            color="white"
                        />
                        <Text className="text-sm text-white pl-2">Limpar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* List */}
            <FlatList
                data={filteredTransactions}
                keyExtractor={(item) => item.title}
                renderItem={renderSection}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 70, flexGrow: 1 }}
                ListEmptyComponent={() => (
                    <View className="flex-1  justify-center items-center">
                        <FontAwesome6
                            name="money-bill-transfer"
                            size={130}
                            color="white"
                        />
                        <Text className="text-white  text-center mt-4">
                            Nenhuma transação encontrada.
                        </Text>
                    </View>
                )}
            />

            {/* Transaction Details */}
            {selectedTransaction && (
                <DetailsTransaction
                    selectedTransaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                    onEdit={() => {}}
                />
            )}
        </View>
    );
}