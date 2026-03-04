import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Standard Library: Tensor",
    description: "Tensor module of the MIND standard library.",
};

export default function StdTensorPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/std/tensor" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/std/tensor" />
                    <h1 className="page-title mt-4">Standard Library: Tensor</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            The <code>tensor</code> module provides the core tensor types and operations for numerical computation.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Key Exports</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><code>Tensor&lt;T, Shape&gt;</code> — The primary tensor type with static shape.</li>
                            <li><code>zeros</code>, <code>ones</code>, <code>full</code> — Tensor constructors.</li>
                            <li><code>add</code>, <code>mul</code>, <code>matmul</code> — Element-wise and matrix operations.</li>
                            <li><code>sum</code>, <code>mean</code>, <code>max</code> — Reduction operations.</li>
                            <li><code>fft</code>, <code>ifft</code>, <code>fft2d</code> — Spectral operations (FFT/IFFT).</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Example Usage</h2>
                        <CodeBlock>{`use tensor::{Tensor, zeros, ones};

fn main() {
    let a: Tensor<f32>[2, 3] = zeros();
    let b: Tensor<f32>[2, 3] = ones();
    let c = a + b;  // Broadcasting add
    print(c);
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Spectral Operations</h2>
                        <p className="text-muted mb-4">
                            MIND provides first-class FFT primitives compiled to native code via cuFFT (CUDA), rocFFT (ROCm),
                            vDSP (Metal), or custom WGSL shaders (WebGPU). All transforms run at O(N log N) with zero runtime dispatch overhead.
                        </p>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3"><code>fft(signal)</code></h3>
                        <p className="text-muted mb-2">
                            1D Fast Fourier Transform. Real input <code>[N]</code> returns complex <code>[N/2+1, 2]</code>.
                            Complex input <code>[N, 2]</code> returns complex <code>[N, 2]</code>.
                        </p>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3"><code>ifft(spectrum)</code></h3>
                        <p className="text-muted mb-2">
                            Inverse 1D FFT with automatic 1/N normalization. Guarantees <code>ifft(fft(x)) == x</code>.
                        </p>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3"><code>fft2d(signal)</code></h3>
                        <p className="text-muted mb-2">
                            2D FFT for image processing and spatial filtering. O(H * W * log(H * W)).
                        </p>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">Backend Dispatch</h3>
                        <div className="overflow-x-auto mb-8">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-2 pr-4">Backend</th>
                                        <th className="text-left py-2">Library</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-border/50"><td className="py-2 pr-4">CUDA</td><td>cuFFT</td></tr>
                                    <tr className="border-b border-border/50"><td className="py-2 pr-4">ROCm</td><td>rocFFT</td></tr>
                                    <tr className="border-b border-border/50"><td className="py-2 pr-4">Metal</td><td>vDSP / Accelerate</td></tr>
                                    <tr><td className="py-2 pr-4">WebGPU</td><td>WGSL Cooley-Tukey</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">FFT Example: Low-Pass Filter</h3>
                        <CodeBlock>{`use tensor::{fft, ifft, zeros, ones};

fn low_pass_filter(signal: Tensor, cutoff: i64) -> Tensor {
    let spectrum = fft(signal);
    let n = spectrum.shape[0];
    let mask = zeros([n, 2]);
    for i in 0..cutoff {
        mask[i] = ones([2]);
        mask[n - 1 - i] = ones([2]);
    }
    return ifft(spectrum * mask);
}`}</CodeBlock>
                    </div>

                    <PageNavigation
                        prev={{ label: "Core", href: "/docs/std/core" }}
                        next={{ label: "Math", href: "/docs/std/math" }}
                    />

                </main>
            </div>
        </div>
    );
}
