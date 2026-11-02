"use client";

import { Bell, CalendarDays, Clock3, Info, MapPin, User,} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DocterInfo({ ShopOwnerInfo }) {
    const router = useRouter();

    const [formattedDate, setFormattedDate] = useState("N/A");

    const createdAt = ShopOwnerInfo?.createdAt;

    // Format date 
    useEffect(() => {
        if (!createdAt) {
            setFormattedDate("N/A");
            return;
        }

        const date = new Date(createdAt);

        if (Number.isNaN(date.getTime())) {
            setFormattedDate("N/A");
            return;
        }

        setFormattedDate(
            new Intl.DateTimeFormat("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: "Asia/Kolkata",
            }).format(date)
        );

    }, [createdAt]);

    return (
        <aside className="space-y-5">

            {/* Shop Notice Button */}
            <button
                onClick={() => router.push(`/notice-alert/${ShopOwnerInfo?.shopId}`) }
                className="flex w-full items-center gap-5 rounded-md bg-orange-600 px-4 py-2 font-bold text-white animate-stretch"
            >
                <Bell size={22} />
                Check My Shop Notices
            </button>

            {/* Shop Owner Details */}
            <section className="rounded-xl border border-blue-100 bg-white p-6">

                <div className="mb-5 flex items-center gap-3">

                    <CalendarDays
                        size={25}
                        className="text-[#102d57]"
                    />

                    <h2 className="text-xl font-bold">
                        Shop Owner&apos;s Details
                    </h2>

                </div>

                <div className="border-t border-slate-100 pt-5">

                    {/* Profile */}
                    <div className="mb-4 flex items-center gap-4">

                        <img
                            src={ShopOwnerInfo?.shopImage || "../image/default-shop.svg"}
                            alt="Shop owner"
                            className="h-20 w-20 rounded-xl object-cover"
                        />

                        <div>
                            <h3 className="font-bold">
                                {ShopOwnerInfo?.name || "N/A"}
                            </h3>

                            <p className="mt-1 text-sm text-[#527099]">
                                {ShopOwnerInfo?.role || "N/A"}
                            </p>
                        </div>

                    </div>

                    {/* Experience */}
                    <h3 className="mb-4 font-semibold text-blue-400">
                        I am {ShopOwnerInfo?.role || "Owner"} from{" "}
                        {ShopOwnerInfo?.experience || "N/A"}
                    </h3>

                    {/* Email */}
                    <InfoRow
                        icon={<User size={24} />}
                        label="Email"
                        value={ShopOwnerInfo?.email || "N/A"}
                    />

                    {/* Date */}
                    <InfoRow
                        icon={<CalendarDays size={24} />}
                        label="Date"
                        value={formattedDate}
                    />

                    {/* Timing */}
                    <InfoRow
                        icon={<Clock3 size={24} />}
                        label="Available At"
                        value={`${ShopOwnerInfo?.openTime || "N/A"} - ${
                            ShopOwnerInfo?.closeTime || "N/A"
                        }`}
                    />

                    {/* Location */}
                    <InfoRow
                        icon={<MapPin size={24} />}
                        label="Location"
                        value={
                            <>
                                <span>
                                    {ShopOwnerInfo?.shopName ||
                                        ShopOwnerInfo?.ShopName ||
                                        "N/A"}
                                </span>

                                <small className="block font-medium text-[#527099]">
                                    {ShopOwnerInfo?.address || ""}
                                    {ShopOwnerInfo?.city
                                        ? `, ${ShopOwnerInfo.city}`
                                        : ""}
                                    {ShopOwnerInfo?.country
                                        ? `, ${ShopOwnerInfo.country}`
                                        : ""}
                                </small>
                            </>
                        }
                    />

                </div>
            </section>

            {/* Note */}
            <section className="rounded-xl border border-blue-100 bg-white p-6">

                <div className="flex items-center gap-3">

                    <Info size={23} />

                    <h2 className="text-lg font-bold">
                        Note
                    </h2>

                </div>

                <ul className="mt-5 space-y-3 pl-5 text-sm leading-6 text-[#527099]">

                    <li className="list-disc">
                        Please do not refresh the page.
                    </li>

                    <li className="list-disc">
                        You will be notified when it&apos;s your turn.
                    </li>

                    <li className="list-disc">
                        The waiting time may vary based on the current situation.
                    </li>

                </ul>

            </section>

        </aside>
    );
}


// Reusable Info Row
function InfoRow({ icon, label, value }) {
    return (
        <div className="mb-5 flex gap-4">

            <div className="mt-0.5 shrink-0 text-[#102d57]">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-md text-[#527099]">
                    {label}
                </p>

                <div className="mt-1 wrap-break-words text-md font-semibold">
                    {value}
                </div>
            </div>

        </div>
    );
}
