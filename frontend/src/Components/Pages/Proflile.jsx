import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { apiGet, apiPost } from "../../lib/api";

const Proflile = () => {
  const { loggedIn } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sellNoteId, setSellNoteId] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellCondition, setSellCondition] = useState("new");

  useEffect(() => {
    let cancelled = false;

    if (!loggedIn) {
      setLoading(false);
      setError(null);
      setOrders([]);
      setListings([]);
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([apiGet("/orders/my.php"), apiGet("/listings/my.php")])
      .then(([ordersRes, listingsRes]) => {
        if (cancelled) return;
        setOrders(ordersRes.data || []);
        setListings(listingsRes.data || []);
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
  }, [loggedIn]);

  const stats = {
    purchased: orders.filter((o) => o.status === "paid" || o.status === "fulfilled").length,
    pending: orders.filter((o) => o.status === "pending").length,
  };

  const createListing = async () => {
    setError(null);

    const note_id = Number(sellNoteId);
    const price = Number(sellPrice);

    if (!note_id || note_id <= 0) {
      setError("note_id is required (use a real note id from the URL)");
      return;
    }
    if (!price || price <= 0) {
      setError("price must be > 0");
      return;
    }

    try {
      await apiPost("/listings/create.php", {
        note_id,
        price,
        condition: sellCondition || "new",
      });
      const listingsRes = await apiGet("/listings/my.php");
      setListings(listingsRes.data || []);
    } catch (e) {
      setError(e.message);
    }
  };

  if (!loggedIn) {
    return (
      <div className="w-full py-10 text-center">
        <div className="text-gray-600">Login required to view your profile.</div>
        <div className="mt-3">
          <Link to="/login" className="underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 flex flex-col gap-6">
      <div className="bg-zinc-900/10 rounded-xl p-5">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="mt-3 text-sm text-gray-700">
          Purchased: {stats.purchased} | Pending: {stats.pending}
        </div>
      </div>

      <div className="bg-zinc-900/10 rounded-xl p-5">
        <h2 className="text-lg font-bold mb-3">Sell a note (create listing)</h2>

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-sm font-medium">Note ID</label>
            <input
              className="border rounded px-3 py-2"
              value={sellNoteId}
              onChange={(e) => setSellNoteId(e.target.value)}
              placeholder="e.g. 1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price</label>
            <input
              className="border rounded px-3 py-2"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              placeholder="e.g. 120"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Condition</label>
            <select
              className="border rounded px-3 py-2"
              value={sellCondition}
              onChange={(e) => setSellCondition(e.target.value)}
            >
              <option value="new">new</option>
              <option value="good">good</option>
              <option value="used">used</option>
            </select>
          </div>
          <button
            type="button"
            onClick={createListing}
            className="bg-black text-white rounded px-4 py-2 font-semibold"
          >
            Create Listing
          </button>
        </div>

        <div className="mt-5">
          <h3 className="font-bold mb-2">Your listings</h3>
          {listings.length ? (
            <div className="flex flex-col gap-2">
              {listings.map((l) => (
                <div key={l.listing_id} className="border rounded p-3 text-sm">
                  Note #{l.note_id} | {l.price} | {l.condition} | {l.status} | Listing #{l.listing_id}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-600">No listings yet.</div>
          )}
        </div>
      </div>

      <div className="bg-zinc-900/10 rounded-xl p-5">
        <h2 className="text-lg font-bold mb-3">Your orders</h2>
        {loading ? (
          <div className="py-6">Loading...</div>
        ) : orders.length ? (
          <div className="flex flex-col gap-3">
            {orders.map((o) => (
              <div key={o.id} className="border rounded p-3 text-sm">
                <div className="font-semibold">Order #{o.id}</div>
                <div className="text-gray-700">Status: {o.status}</div>
                <div className="text-gray-700">Quantity: {o.quantity} | Total: {o.total_amount}</div>
                <div className="text-gray-700">
                  Note: {o.title} ({o.subject_code})
                </div>
                <div className="text-gray-700">Seller: {o.seller_name} | Buyer: {o.buyer_name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-600">No orders yet.</div>
        )}
      </div>
    </div>
  );
};

export default Proflile;

