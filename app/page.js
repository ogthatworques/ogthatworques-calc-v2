'use client';

import { useMemo, useState } from 'react';
import { Calculator, Car, Truck, Sparkles, CheckCircle2, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const packagePricing = {
  Bronze: {
    Cars: 170,
    'SUVs / Small Trucks': 200,
    'Large Trucks / Vans': 230,
    includes: ['Exterior wash', 'Interior vacuum', 'Windows & wipe down'],
  },
  Silver: {
    Cars: 220,
    'SUVs / Small Trucks': 250,
    'Large Trucks / Vans': 280,
    includes: ['Bronze package', 'Wax & tire shine', 'Dash & trim detail'],
  },
  Gold: {
    Cars: 270,
    'SUVs / Small Trucks': 300,
    'Large Trucks / Vans': 330,
    includes: ['Silver package', 'Shampoo seats & carpets', 'Engine bay cleaning', 'Decontamination & Claybar'],
  },
};

const addOns = [
  { name: 'Engine Detailing', price: 50 },
  { name: 'Ceramic Coating (1 Year)', price: 400 },
];

const paintCorrectionStages = [
  { label: 'None', value: 0 },
  { label: 'Stage 1', value: 100 },
  { label: 'Stage 2', value: 200 },
  { label: 'Stage 3', value: 300 },
];

const packageStyles = {
  Bronze: 'from-amber-700 to-orange-900 border-amber-500/30',
  Silver: 'from-zinc-300 to-zinc-700 border-zinc-400/30',
  Gold: 'from-yellow-400 to-amber-700 border-yellow-400/30',
};

export default function OGthatWorquesTapCalculator() {
  const [selectedPackage, setSelectedPackage] = useState('Bronze');
  const [vehicleSize, setVehicleSize] = useState('Cars');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [paintCorrectionStage, setPaintCorrectionStage] = useState(0);

  const basePrice = packagePricing[selectedPackage][vehicleSize];

  const addOnTotal = useMemo(
    () => selectedAddOns.reduce((sum, item) => sum + item.price, 0),
    [selectedAddOns]
  );

  const total = basePrice + addOnTotal + paintCorrectionStage;

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((current) => {
      const exists = current.some((item) => item.name === addOn.name);
      return exists
        ? current.filter((item) => item.name !== addOn.name)
        : [...current, addOn];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-300">
            <Sparkles className="h-4 w-4" />
            OGthatWorques Auto & Truck Detailing
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Automotive Detailing Qoute Calculator</h1>
          <p className="mt-3 text-base text-zinc-300 sm:text-lg">Choose a package, tap your vehicle size, and add extras to get your estimated starting price.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {Object.entries(packagePricing).map(([pkg, data]) => (
            <button
              key={pkg}
              onClick={() => setSelectedPackage(pkg)}
              className={`rounded-3xl border bg-gradient-to-br p-[1px] text-left shadow-2xl transition duration-200 hover:scale-[1.01] ${packageStyles[pkg]} ${selectedPackage === pkg ? 'ring-2 ring-white/60' : ''}`}
            >
              <div className="h-full rounded-[calc(1.5rem-1px)] bg-zinc-950/90 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black">{pkg}</h2>
                  {selectedPackage === pkg && <CheckCircle2 className="h-6 w-6 text-green-400" />}
                </div>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-zinc-400">Pricing starting at</p>
                <div className="mt-4 space-y-3">
                  {['Cars', 'SUVs / Small Trucks', 'Large Trucks / Vans'].map((size) => (
                    <div key={size} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <span className="text-sm text-zinc-300">{size}</span>
                      <span className="text-2xl font-black">${data[size]}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  {data.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-3xl border-white/10 bg-zinc-950/80 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-black">
                <Calculator className="h-6 w-6" />
                Build Your Quote
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">1. Select package</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {Object.keys(packagePricing).map((pkg) => (
                    <Button
                      key={pkg}
                      onClick={() => setSelectedPackage(pkg)}
                      variant="outline"
                      className={`h-14 rounded-2xl border-white/10 text-base font-bold ${selectedPackage === pkg ? 'bg-white text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
                    >
                      {pkg}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">2. Tap your vehicle size</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Cars', icon: Car },
                    { label: 'SUVs / Small Trucks', icon: Car },
                    { label: 'Large Trucks / Vans', icon: Truck },
                  ].map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => setVehicleSize(label)}
                      className={`rounded-2xl border p-4 text-left transition ${vehicleSize === label ? 'border-white bg-white text-black' : 'border-white/10 bg-white/5 text-white hover:bg-white/10'}`}
                    >
                      <Icon className="mb-3 h-6 w-6" />
                      <div className="text-sm font-medium">{label}</div>
                      <div className="mt-2 text-2xl font-black">${packagePricing[selectedPackage][label]}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">3. Add extras</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {addOns.map((addOn) => {
                    const active = selectedAddOns.some((item) => item.name === addOn.name);
                    return (
                      <button
                        key={addOn.name}
                        onClick={() => toggleAddOn(addOn)}
                        className={`rounded-2xl border p-4 text-left transition ${active ? 'border-green-400 bg-green-400/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                      >
                        <div className="text-base font-bold">{addOn.name}</div>
                        <div className="mt-2 text-2xl font-black">${addOn.price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">4. Paint correction stage</p>
                <div className="grid gap-3 sm:grid-cols-4">
                  {paintCorrectionStages.map((stage) => {
                    const active = paintCorrectionStage === stage.value;
                    return (
                      <button
                        key={stage.label}
                        onClick={() => setPaintCorrectionStage(stage.value)}
                        className={`rounded-2xl border p-4 text-left transition ${active ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                      >
                        <Wand2 className="mb-3 h-5 w-5" />
                        <div className="text-sm font-bold">{stage.label}</div>
                        <div className="mt-2 text-2xl font-black">${stage.value}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-white/10 bg-zinc-950/80 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-black">Estimated Starting Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">Selected package</div>
                <div className="mt-1 text-2xl font-black">{selectedPackage}</div>

                <div className="mt-5 text-sm uppercase tracking-[0.2em] text-zinc-400">Vehicle size</div>
                <div className="mt-1 text-xl font-bold">{vehicleSize}</div>

                <div className="mt-5 flex items-center justify-between text-lg">
                  <span className="text-zinc-300">Base price</span>
                  <span className="font-black">${basePrice}</span>
                </div>

                <div className="mt-3">
                  <div className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-400">Add-ons</div>
                  {selectedAddOns.length === 0 && paintCorrectionStage === 0 ? (
                    <div className="text-zinc-400">No add-ons selected</div>
                  ) : (
                    <div className="space-y-2">
                      {selectedAddOns.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <span className="text-zinc-300">{item.name}</span>
                          <span className="font-bold">${item.price}</span>
                        </div>
                      ))}
                      {paintCorrectionStage > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-300">Paint Correction {paintCorrectionStage / 100 === 1 ? 'Stage 1' : paintCorrectionStage / 100 === 2 ? 'Stage 2' : 'Stage 3'}</span>
                          <span className="font-bold">${paintCorrectionStage}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-lg font-semibold">Total starting at</span>
                  <span className="text-4xl font-black">${total}</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-400">Starting prices may vary based on condition, soil level, pet hair, stains, and time required.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}