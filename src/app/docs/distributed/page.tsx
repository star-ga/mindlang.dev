import { Metadata } from "next";
import Link from "next/link";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
    title: "Distributed Execution",
    description: "Scale MIND models across multiple nodes with distributed training and inference.",
};

export default function DistributedPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/distributed" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/distributed" />
                    <h1 className="page-title mt-4">Distributed Execution</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND provides first-class support for distributed training and inference, allowing you to scale models across multiple nodes with automatic sharding, gradient synchronization, and fault tolerance.
                        </p>

                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
                            <p className="text-sm text-emerald-800 m-0">
                                <strong>Production Ready:</strong> Distributed execution is complete with TCP transport, NCCL/Gloo backends, RingAllReduce, pipeline parallelism, and fault tolerance. See the <Link href="/roadmap" className="text-emerald-600 underline">Roadmap</Link> for full status.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Overview</h2>
                        <p className="text-muted mb-4">
                            MIND's distributed execution framework supports three parallelism strategies:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Data Parallelism</strong>: Replicate the model across devices and split data batches</li>
                            <li><strong>Model Parallelism</strong>: Split large models across devices when they don't fit in memory</li>
                            <li><strong>Pipeline Parallelism</strong>: Split model layers across devices for improved throughput</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Getting Started</h2>
                        <p className="text-muted mb-4">
                            Enable distributed execution with the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">@distributed</code> annotation:
                        </p>

                        <CodeBlock className="mb-8">{`use mind::distributed::{init, world_size, rank};

@distributed(strategy = "data_parallel")
fn train_step(model: &mut Model, batch: Tensor<f32, [B, 784]>) -> f32 {
    let output = model.forward(batch);
    let loss = cross_entropy(output, labels);

    // Gradients are automatically synchronized across all nodes
    loss.backward();
    optimizer.step();

    loss.item()
}

fn main() {
    // Initialize distributed runtime
    init();

    println!("Running on node {} of {}", rank(), world_size());

    for epoch in 0..100 {
        let loss = train_step(&mut model, batch);
        if rank() == 0 {
            println!("Epoch {}: loss = {:.4}", epoch, loss);
        }
    }
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Data Parallelism</h2>
                        <p className="text-muted mb-4">
                            Data parallelism replicates the model on each device and splits input batches. Gradients are averaged across all replicas using all-reduce operations.
                        </p>

                        <CodeBlock className="mb-8">{`use mind::distributed::{DataParallel, AllReduce};

// Wrap model for data parallel training
let model = DataParallel::new(model, devices);

// Training loop - batches are automatically distributed
for batch in dataloader.iter() {
    let loss = model.forward(batch);
    loss.backward();

    // Gradients synchronized via NCCL/Gloo
    optimizer.step();
}`}</CodeBlock>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">Gradient Synchronization</h3>
                        <p className="text-muted mb-4">
                            MIND supports multiple collective communication backends:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Backend</th>
                                        <th className="text-left py-2 pr-4 font-bold">Devices</th>
                                        <th className="text-left py-2 font-bold">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">NCCL</td>
                                        <td className="py-2 pr-4">NVIDIA GPU</td>
                                        <td className="py-2">Recommended for multi-GPU training</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Gloo</td>
                                        <td className="py-2 pr-4">CPU, GPU</td>
                                        <td className="py-2">Cross-platform, supports TCP/IP</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">MPI</td>
                                        <td className="py-2 pr-4">CPU, GPU</td>
                                        <td className="py-2">HPC clusters with InfiniBand</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Model Parallelism</h2>
                        <p className="text-muted mb-4">
                            For models that don't fit on a single device, use model parallelism to split layers across devices:
                        </p>

                        <CodeBlock className="mb-8">{`use mind::distributed::{ModelParallel, DeviceMap};

// Define how layers map to devices
let device_map = DeviceMap::new()
    .layer("embed", Device::cuda(0))
    .layers("transformer.0..12", Device::cuda(0))
    .layers("transformer.12..24", Device::cuda(1))
    .layer("head", Device::cuda(1));

// Create model parallel wrapper
let model = ModelParallel::new(model, device_map);

// Forward pass automatically moves tensors between devices
let output = model.forward(input);`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Pipeline Parallelism</h2>
                        <p className="text-muted mb-4">
                            Pipeline parallelism enables higher throughput by overlapping computation across micro-batches:
                        </p>

                        <CodeBlock className="mb-8">{`use mind::distributed::{Pipeline, Schedule};

// Configure pipeline with micro-batching
let pipeline = Pipeline::new(model)
    .stages(4)                    // Split into 4 pipeline stages
    .micro_batches(8)             // 8 micro-batches per batch
    .schedule(Schedule::GPipe);   // Or Schedule::PipeDream

// Training with pipeline parallelism
for batch in dataloader.iter() {
    let loss = pipeline.forward_backward(batch);
    optimizer.step();
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Multi-Node Training</h2>
                        <p className="text-muted mb-4">
                            Scale training across multiple machines using the MIND distributed launcher:
                        </p>

                        <CodeBlock className="mb-8">{`# Launch on 4 nodes with 8 GPUs each
mind launch --nodes 4 --gpus-per-node 8 \\
    --master-addr 192.168.1.1 \\
    --master-port 29500 \\
    train.mind

# Or use a hostfile
mind launch --hostfile hosts.txt --gpus-per-node 8 train.mind`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Fault Tolerance</h2>
                        <p className="text-muted mb-4">
                            MIND supports elastic training with automatic checkpointing and recovery:
                        </p>

                        <CodeBlock className="mb-8">{`use mind::distributed::{Elastic, Checkpoint};

// Enable elastic training with checkpointing
let trainer = Elastic::new(model)
    .min_nodes(2)
    .max_nodes(8)
    .checkpoint_dir("checkpoints/")
    .checkpoint_interval(1000);  // steps

// Training automatically resumes on node failure
trainer.fit(dataloader, epochs);`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Complete Example: Distributed MNIST Training</h2>
                        <p className="text-muted mb-4">
                            Here's a complete example training a simple neural network on MNIST across multiple GPUs:
                        </p>

                        <CodeBlock className="mb-8">{`// distributed_mnist.mind
use mind::nn::{Linear, relu, softmax, cross_entropy};
use mind::optim::{Adam, Optimizer};
use mind::data::{Dataset, DataLoader};
use mind::distributed::{init, rank, world_size, DataParallel, all_reduce};

struct MLP {
    fc1: Linear<784, 256>,
    fc2: Linear<256, 128>,
    fc3: Linear<128, 10>,
}

impl MLP {
    fn forward(&self, x: Tensor<f32, [B, 784]>) -> Tensor<f32, [B, 10]> {
        let h1 = relu(self.fc1.forward(x));
        let h2 = relu(self.fc2.forward(h1));
        softmax(self.fc3.forward(h2), axis: -1)
    }
}

fn main() {
    // Initialize distributed runtime (auto-detects backend)
    init();

    let local_rank = rank();
    let n_workers = world_size();

    if local_rank == 0 {
        println!("Training with {} workers", n_workers);
    }

    // Create model and wrap for data parallelism
    let model = MLP::new();
    let model = DataParallel::new(model);

    // Optimizer with scaled learning rate
    let lr = 0.001 * (n_workers as f32).sqrt();
    let optimizer = Adam::new(model.parameters(), lr: lr);

    // Each worker gets a shard of the dataset
    let dataset = Dataset::mnist("data/", train: true);
    let loader = DataLoader::new(dataset)
        .batch_size(64)
        .shuffle(true)
        .distributed(rank: local_rank, world_size: n_workers);

    // Training loop
    for epoch in 0..10 {
        let mut total_loss = 0.0;
        let mut batches = 0;

        for (images, labels) in loader.iter() {
            // Forward pass
            let output = model.forward(images);
            let loss = cross_entropy(output, labels);

            // Backward pass (gradients auto-synced)
            loss.backward();
            optimizer.step();
            optimizer.zero_grad();

            total_loss += loss.item();
            batches += 1;
        }

        // Reduce loss across all workers for logging
        let avg_loss = all_reduce(total_loss, op: "mean") / (batches as f32);

        if local_rank == 0 {
            println!("Epoch {}: loss = {:.4}", epoch + 1, avg_loss);
        }
    }

    // Save model (only on rank 0)
    if local_rank == 0 {
        model.save("mnist_model.mind");
        println!("Model saved!");
    }
}`}</CodeBlock>

                        <p className="text-muted mb-4">
                            Launch with:
                        </p>

                        <CodeBlock className="mb-8">{`# Single node, 4 GPUs
mind launch --gpus 4 distributed_mnist.mind

# Multi-node (2 nodes, 8 GPUs each)
mind launch --nodes 2 --gpus-per-node 8 \\
    --master-addr 10.0.0.1 distributed_mnist.mind`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Environment Variables</h2>
                        <p className="text-muted mb-4">
                            Configure distributed execution with these environment variables:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Variable</th>
                                        <th className="text-left py-2 pr-4 font-bold">Default</th>
                                        <th className="text-left py-2 font-bold">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">MIND_BACKEND</td>
                                        <td className="py-2 pr-4">nccl</td>
                                        <td className="py-2">Communication backend (nccl, gloo, mpi)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">MIND_MASTER_ADDR</td>
                                        <td className="py-2 pr-4">localhost</td>
                                        <td className="py-2">Master node IP address</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">MIND_MASTER_PORT</td>
                                        <td className="py-2 pr-4">29500</td>
                                        <td className="py-2">Master node port for coordination</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">MIND_WORLD_SIZE</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Total number of workers</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">MIND_RANK</td>
                                        <td className="py-2 pr-4">0</td>
                                        <td className="py-2">This worker's rank</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">MIND_LOCAL_RANK</td>
                                        <td className="py-2 pr-4">0</td>
                                        <td className="py-2">Local GPU index on this node</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono text-sm">MIND_PROFILE</td>
                                        <td className="py-2 pr-4">0</td>
                                        <td className="py-2">Enable profiling (1=basic, 2=detailed)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Best Practices</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Start with data parallelism for most workloads - it's the simplest and most efficient</li>
                            <li>Use gradient accumulation to simulate larger batch sizes without more memory</li>
                            <li>Profile communication overhead with <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">MIND_PROFILE=1</code></li>
                            <li>Enable mixed precision training to reduce communication bandwidth</li>
                            <li>Use gradient compression for slow network connections</li>
                            <li>Scale learning rate with the square root of worker count for stable convergence</li>
                            <li>Use warmup epochs when training with many workers</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Runtime Implementation</h2>
                        <p className="text-muted mb-4">
                            The MIND runtime provides production-grade distributed primitives:
                        </p>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">Transport Layer</h3>
                        <p className="text-muted mb-4">
                            TCP-based transport with connection pooling, message serialization, and ring topology helpers for efficient collective operations.
                        </p>
                        <CodeBlock className="mb-8">{`use mind::distributed::transport::{TcpTransport, TransportConfig};

let config = TransportConfig {
    bind_addr: "0.0.0.0:29500".parse()?,
    connect_timeout_ms: 5000,
    buffer_size: 1024 * 1024,  // 1MB
};

let transport = TcpTransport::new(config, rank, world_size)?;

// Ring topology helpers
let left = transport.left_neighbor();   // (rank - 1) % world_size
let right = transport.right_neighbor(); // (rank + 1) % world_size`}</CodeBlock>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">Communication Backends</h3>
                        <p className="text-muted mb-4">
                            Abstract backend trait with NCCL (GPU) and Gloo (CPU/cross-platform) implementations:
                        </p>
                        <CodeBlock className="mb-8">{`use mind::distributed::backend::{Backend, NcclBackend, GlooBackend};

// Auto-select based on hardware
let backend = Backend::auto_select()?;

// Or explicitly choose
let nccl = NcclBackend::new(rank, world_size)?;  // GPU clusters
let gloo = GlooBackend::new(rank, world_size)?;  // CPU or cross-platform

// Collective operations via backend
backend.all_reduce(tensor, AllReduceOp::Sum)?;
backend.broadcast(tensor, root: 0)?;
backend.barrier()?;`}</CodeBlock>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-3">Fault Tolerance</h3>
                        <p className="text-muted mb-4">
                            Elastic training with automatic failure detection and recovery:
                        </p>
                        <CodeBlock className="mb-8">{`use mind::distributed::coordinator::{
    DistributedCoordinator, FaultToleranceConfig, ClusterHealth
};

let fault_config = FaultToleranceConfig {
    min_workers: 2,
    max_workers: 16,
    elastic: true,                // Allow dynamic scaling
    checkpoint_interval: 1000,    // Steps between checkpoints
    auto_recover: true,
    max_heartbeat_misses: 3,
    replacement_delay_ms: 5000,
};

let coordinator = DistributedCoordinator::new_with_fault_tolerance(
    world_size, fault_config
)?;

// Monitor cluster health
let health: ClusterHealth = coordinator.health_status();
println!("Workers: {}/{} alive, can_train: {}",
    health.alive_workers, health.total_workers, health.can_train);

// Automatic checkpoint on failure
if coordinator.should_checkpoint() {
    model.save_checkpoint("checkpoint.mind")?;
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the <Link href="/docs/future" className="text-primary hover:underline">Future Extensions</Link> page for upcoming distributed features and the <Link href="/roadmap" className="text-primary hover:underline">Roadmap</Link> for development status.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "FFI & Bindings", href: "/docs/ffi" }}
                        next={{ label: "Deployment", href: "/docs/deployment" }}
                    />

                </main>
            </div>
        </div>
    );
}
