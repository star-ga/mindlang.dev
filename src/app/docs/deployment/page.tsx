import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
    title: "Deployment",
    description: "Deploy MIND models to production with containers, serverless, and edge devices.",
};

export default function DeploymentPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/deployment" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Deployment</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND provides production-ready deployment options for cloud, edge, and on-premise environments with built-in serving infrastructure, auto-scaling, and monitoring.
                        </p>

                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
                            <p className="text-sm text-orange-800 m-0">
                                <strong>Early Access:</strong> Deployment features are currently in Phase 15 development. The APIs described here are subject to change. See the <Link href="/roadmap" className="text-orange-600 underline">Roadmap</Link> for current status.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Deployment Options</h2>
                        <p className="text-muted mb-4">
                            MIND supports multiple deployment targets:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Target</th>
                                        <th className="text-left py-2 pr-4 font-bold">Use Case</th>
                                        <th className="text-left py-2 font-bold">Features</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-medium">Container</td>
                                        <td className="py-2 pr-4">Kubernetes, Docker</td>
                                        <td className="py-2">Auto-scaling, health checks, rolling updates</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-medium">Serverless</td>
                                        <td className="py-2 pr-4">AWS Lambda, Cloud Run</td>
                                        <td className="py-2">Pay-per-request, automatic scaling</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-medium">Edge</td>
                                        <td className="py-2 pr-4">IoT, mobile, embedded</td>
                                        <td className="py-2">Optimized binary, low latency</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-medium">Bare Metal</td>
                                        <td className="py-2 pr-4">On-premise, HPC</td>
                                        <td className="py-2">Maximum performance, custom hardware</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Quick Start</h2>
                        <p className="text-muted mb-4">
                            Deploy a trained model with a single command:
                        </p>

                        <CodeBlock className="mb-8">{`# Build optimized inference binary
mind build --release model.mind -o model.bin

# Deploy to local serving endpoint
mind serve model.bin --port 8080

# Or deploy to cloud
mind deploy model.bin --target aws --region us-east-1`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Container Deployment</h2>
                        <p className="text-muted mb-4">
                            Generate production-ready Docker images with the MIND CLI:
                        </p>

                        <CodeBlock className="mb-8">{`# Generate Dockerfile and build image
mind container build --image my-model:v1.0 model.mind

# Push to registry
docker push my-model:v1.0

# Deploy to Kubernetes
mind deploy model.mind \\
    --target kubernetes \\
    --replicas 3 \\
    --cpu 2 \\
    --memory 4Gi \\
    --gpu 1`}</CodeBlock>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">Kubernetes Manifest</h3>
                        <p className="text-muted mb-4">
                            MIND generates Kubernetes manifests with best practices:
                        </p>

                        <CodeBlock className="mb-8">{`# Generated by: mind deploy --target kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-model
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-model
  template:
    spec:
      containers:
      - name: inference
        image: my-model:v1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: "2"
            memory: "4Gi"
            nvidia.com/gpu: "1"
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
        livenessProbe:
          httpGet:
            path: /health
            port: 8080`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Model Serving</h2>
                        <p className="text-muted mb-4">
                            MIND's built-in serving infrastructure provides REST and gRPC endpoints:
                        </p>

                        <CodeBlock className="mb-8">{`use mind::serve::{Server, Endpoint};

// Define inference endpoint
@endpoint("/predict")
fn predict(input: Tensor<f32, [1, 784]>) -> Tensor<f32, [1, 10]> {
    model.forward(input)
}

// Start server with auto-batching
fn main() {
    Server::new()
        .model(model)
        .batch_size(32)
        .batch_timeout_ms(10)
        .port(8080)
        .serve();
}`}</CodeBlock>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">API Endpoints</h3>
                        <p className="text-muted mb-4">
                            The serving runtime exposes these endpoints:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Endpoint</th>
                                        <th className="text-left py-2 pr-4 font-bold">Method</th>
                                        <th className="text-left py-2 font-bold">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">/predict</td>
                                        <td className="py-2 pr-4">POST</td>
                                        <td className="py-2">Run inference on input data</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">/health</td>
                                        <td className="py-2 pr-4">GET</td>
                                        <td className="py-2">Health check for load balancers</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">/metrics</td>
                                        <td className="py-2 pr-4">GET</td>
                                        <td className="py-2">Prometheus metrics</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">/info</td>
                                        <td className="py-2 pr-4">GET</td>
                                        <td className="py-2">Model metadata and version</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Edge Deployment</h2>
                        <p className="text-muted mb-4">
                            Deploy optimized models to edge devices with minimal runtime:
                        </p>

                        <CodeBlock className="mb-8">{`# Build for ARM64 edge device
mind build --target aarch64-unknown-linux-gnu \\
    --optimize size \\
    --quantize int8 \\
    model.mind -o model-edge.bin

# Build for WebAssembly (browser)
mind build --target wasm32 \\
    --optimize size \\
    model.mind -o model.wasm`}</CodeBlock>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">Optimization Options</h3>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Quantization</strong>: INT8/INT4 inference for reduced memory and faster execution</li>
                            <li><strong>Pruning</strong>: Remove redundant weights for smaller models</li>
                            <li><strong>Fusion</strong>: Combine operators for fewer kernel launches</li>
                            <li><strong>Static shapes</strong>: Compile with fixed input shapes for optimized code paths</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">A/B Testing & Canary Deployments</h2>
                        <p className="text-muted mb-4">
                            MIND supports gradual rollouts and traffic splitting:
                        </p>

                        <CodeBlock className="mb-8">{`# Deploy new version with 10% traffic
mind deploy model-v2.mind \\
    --canary \\
    --traffic-percent 10 \\
    --monitor latency,accuracy

# Promote to 100% after validation
mind deploy promote model-v2

# Rollback if issues detected
mind deploy rollback`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Monitoring & Observability</h2>
                        <p className="text-muted mb-4">
                            Built-in monitoring with OpenTelemetry integration:
                        </p>

                        <CodeBlock className="mb-8">{`use mind::serve::{Server, Metrics};

Server::new()
    .model(model)
    .metrics(Metrics::new()
        .histogram("latency_ms")
        .counter("requests_total")
        .gauge("batch_size")
        .enable_tracing())
    .otlp_endpoint("http://collector:4317")
    .serve();`}</CodeBlock>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">Available Metrics</h3>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Inference latency</strong>: p50, p95, p99 latency histograms</li>
                            <li><strong>Throughput</strong>: Requests per second, batch utilization</li>
                            <li><strong>Resource usage</strong>: GPU memory, CPU utilization</li>
                            <li><strong>Model drift</strong>: Input/output distribution changes</li>
                            <li><strong>Error rates</strong>: Failed predictions, timeouts</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Model Versioning</h2>
                        <p className="text-muted mb-4">
                            Track and manage model versions with built-in versioning:
                        </p>

                        <CodeBlock className="mb-8">{`# Tag a model version
mind model tag model.mind v1.2.0 --message "Improved accuracy"

# List versions
mind model versions

# Deploy specific version
mind deploy model@v1.2.0

# Compare versions
mind model diff v1.1.0 v1.2.0`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Best Practices</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Always use versioned model artifacts in production</li>
                            <li>Enable health checks and readiness probes for container deployments</li>
                            <li>Use auto-batching to maximize throughput under load</li>
                            <li>Set resource limits to prevent OOM issues</li>
                            <li>Monitor model drift and retrain when accuracy degrades</li>
                            <li>Use canary deployments for risky changes</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See <Link href="/docs/distributed" className="text-primary hover:underline">Distributed Execution</Link> for multi-node deployment and the <Link href="/roadmap" className="text-primary hover:underline">Roadmap</Link> for upcoming deployment features.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "Distributed Execution", href: "/docs/distributed" }}
                        next={{ label: "Conformance", href: "/docs/conformance" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/deployment" />
                </main>
            </div>
        </div>
    );
}
