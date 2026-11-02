
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

import Banner from "../../shopComponents/Banner";
import ShowCustomers from "../../shopComponents/ShowCustomers";
import Profile from "../../shopComponents/Profile";
import Footer from "@/app/components/Footer";

import { myShopData } from "@/services/createShopServices";
import { myAllCustomers } from "@/services/bookingTicketService";
import { CallStatusService } from "@/services/historyService";

export default function Page({ params }) {
    const { id } = use(params);


    const [shopData, setShopData] = useState(null);
    const [customersdata, setCustomersdata] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    // FETCH SHOP AND CUSTOMERS
    useEffect(() => {
        let cancelled = false;

        async function fetchShopData() {
            setLoading(true);
            setError(false);
            setShopData(null);
            setCustomersdata([]);

            try {
                const response = await myShopData(id);

                // API successfully responded, but no shop exists
                const shop = response?.data?.[0] ?? null;

                if (cancelled) return;

                if (!shop) {
                    setShopData(null);
                    setLoading(false);
                    return;
                }

                setShopData(shop);

                const customersResponse = await myAllCustomers(id);

                if (cancelled) return;

                setCustomersdata(customersResponse?.data ?? []);
            } catch (err) {
                console.error("Error fetching shop data:", err);

                if (!cancelled) {
                    setError(true);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchShopData();

        return () => {
            cancelled = true;
        };
    }, [id, retryCount]);


    useEffect(() => {
        if (!shopData) {
            setCurrentStatus(null);
            return;
        }

        let cancelled = false;

        async function fetchCallStatus() {
            try {
                const response = await CallStatusService(id);

                if (!cancelled) {
                    setCurrentStatus(response?.data ?? null);
                }
            } catch (err) {
                console.error(" fetching call status:", err);
            }
        }

        fetchCallStatus();

        return () => {
            cancelled = true;
        };
    }, [id, shopData]);

    
    // LOADING UI
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-semibold text-slate-600">
                    Loading your shop...
                </p>
            </div>
        );
    }

    //If err 
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4">
                <h1 className="text-2xl font-bold text-red-600">
                    Network Error!
                </h1>

                <p className="text-center text-slate-600">
                    Unable to fetch your shop data.
                    Please check your internet connection and try again.
                </p>

                <button
                    onClick={() => setRetryCount((count) => count + 1)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Shop Not Found/created
    if (!shopData) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center gap-8 px-4">
                <h1 className="text-xl font-bold text-slate-800 text-center">
                    You Have Not Created Any Shop!
                </h1>

                <p className="text-slate-500 text-center">
                    Create your shop to manage customers and appointments.
                </p>

                <Link
                    href="/create-shop"
                    className="text-white font-bold px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
                >
                    Create Shop
                </Link>
            </div>
        );
    }

    // DASHBOARD
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <main className="max-w-7xl mx-auto p-6">


                {/* //Banner */}
                <Banner shopData={shopData} />

                <section className="grid md:grid-cols-3 gap-5 mb-6">
                    <StatCard
                        icon="👥"
                        title="Total Clients"
                        value={currentStatus?.totalCount ?? 0}
                        text="Active clients"
                    />

                    <StatCard
                        icon="📅"
                        title="Today's Completed"
                        value={currentStatus?.CompletedCount ?? 0}
                        text={`I have ${
                            currentStatus?.CompletedCount ?? 0
                        } appointments today`}
                    />

                    <StatCard
                        icon="⏰"
                        title="Remaining Clients"
                        value={currentStatus?.waitingCount ?? 0}
                        text="Today's remaining customers"
                    />
                </section>

                <div className="w-full flex flex-col justify-center gap-10 md:flex-row">
                    <ShowCustomers Customersdata={customersdata} />
                    <Profile shopData={shopData} />
                </div>
            </main>

            <footer className="text-center py-8 text-sm text-slate-500">
                🛡️ Better Appointments → Happier Clients → A More Organized You
            </footer>

            <Footer />
        </div>
    );
}

function StatCard({ icon, title, value, text }) {
    return (
        <div className="bg-white border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="text-3xl px-4">{icon}</div>

                <div className="flex flex-col items-center">
                    <p className="font-semibold">{title}</p>

                    <h3 className="text-3xl font-bold text-[#173454] mt-1">
                        {value}
                    </h3>
                </div>
            </div>

            <p className="text-sm text-slate-500 mt-3 pl-15">
                {text}
            </p>
        </div>
    );
}
