import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { apiGet, apiPost } from "../../lib/api";

const NoteDetail = () => {
  const { id } = useParams();
  const { loggedIn } = useContext(UserContext);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedListingId, setSelectedListingId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [buyLoading, setBuyLoading] = useState(false);
  const [buyError, setBuyError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const fromPrice = useMemo(() => {
    const listings = detail?.listings ?? [];
    if (!listings.length) return 0;
    return Math.min(...listings.map((l) => Number(l.price || 0)));
  }, [detail]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    apiGet("/notes/detail.php", { id })
      .then((data) => {
        if (cancelled) return;
        setDetail(data.data);
        const first = data.data?.listings?.[0];
        if (first) setSelectedListingId(first.listing_id);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const buy = async () => {
    setBuyError(null);
    setOrderId(null);

    if (!loggedIn) {
      setBuyError("Please login to buy.");
      return;
    }
    if (!selectedListingId) {
      setBuyError("Please select a listing.");
      return;
    }

    setBuyLoading(true);
    try {
      const res = await apiPost("/buy/create_order.php", {
        listing_id: selectedListingId,
        quantity,
      });
      setOrderId(res.order_id);
    } catch (e) {
      setBuyError(e.message);
    } finally {
      setBuyLoading(false);
    }
  };

  if (loading) return <div className="py-6">Loading...</div>;
  if (error) return <div className="py-6 text-red-600">{error}</div>;
  if (!detail) return null;

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="bg-zinc-900/10 rounded-xl p-5">
        <h1 className="text-2xl font-bold">{detail.note.title}</h1>
        <div className="text-sm text-gray-600">{detail.note.subject_code}</div>
        <div className="text-sm text-gray-600">Author: {detail.note.author_name}</div>
        <div className="mt-3 flex gap-3 flex-wrap">
          <div className="px-3 py-1 bg-amber-200 rounded">Rating: {detail.note.rating}</div>
          <div className="px-3 py-1 bg-yellow-200 rounded">From: {fromPrice}</div>
        </div>
      </div>

      <div className="bg-zinc-900/10 rounded-xl p-5">
        <h2 className="text-lg font-bold mb-3">Buy listings</h2>

        {detail.listings?.length ? (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Select listing</label>
            <select
              value={selectedListingId ?? ""}
              onChange={(e) => setSelectedListingId(Number(e.target.value))}
              className="border rounded px-3 py-2"
            >
              {detail.listings.map((l) => (
                <option key={l.listing_id} value={l.listing_id}>
                  {l.seller_name} - {l.price} ({l.condition})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
                className="border rounded px-3 py-2 w-24"
              />
            </div>

            {buyError && <div className="text-red-600 text-sm">{buyError}</div>}
            {orderId && (
              <div className="text-green-600 text-sm">
                Order created. Order ID: {orderId}
                <div className="text-xs text-gray-600 mt-1">
                  Payment gateway placeholder: reserved/pending.
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={buy}
              disabled={buyLoading}
              className="bg-black text-white rounded px-4 py-2 font-semibold disabled:opacity-50"
            >
              {buyLoading ? "Processing..." : "Buy (Payment Placeholder)"}
            </button>
          </div>
        ) : (
          <div className="text-sm text-gray-600">No active listings for this note.</div>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;

