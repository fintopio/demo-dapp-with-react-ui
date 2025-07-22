# Docker Deployment Guide

This guide explains how to deploy the demo dApp using Docker.

## Quick Start

### Production Deployment

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```
   The application will be available at http://localhost:8080

2. **Build and run manually:**
   ```bash
   # Build the image
   docker build -t demo-dapp-react .
   
   # Run the container
   docker run -p 8080:3000 demo-dapp-react
   ```

## Docker Commands

### Building
```bash
# Build production image
docker build -t demo-dapp-react .
```

### Running
```bash
# Run production container
docker run -d -p 8080:3000 --name demo-dapp demo-dapp-react
```

### Management
```bash
# View logs
docker logs demo-dapp

# Stop container
docker stop demo-dapp

# Remove container
docker rm demo-dapp

# Remove image
docker rmi demo-dapp-react
```

## Configuration

### Environment Variables
You can pass environment variables during build or runtime:

```bash
# Build with build args
docker build --build-arg NODE_ENV=production -t demo-dapp-react .

# Run with environment variables
docker run -p 8080:3000 -e NODE_ENV=production demo-dapp-react
```

### Static File Serving
The production image uses the `serve` package which provides:
- Client-side routing support for React Router
- Automatic MIME type detection
- Compression support
- Simple and lightweight static file serving

## Health Checks
The production container includes health checks that verify the application is running correctly:
- Endpoint: `http://localhost:3000/`
- Interval: 30 seconds
- Timeout: 3 seconds
- Retries: 3

## Production Considerations

1. **SSL/TLS**: Consider using a reverse proxy like nginx or traefik for SSL termination
2. **Environment Variables**: Use Docker secrets or environment files for sensitive configuration
3. **Volumes**: Consider using volumes for persistent data if needed
4. **Scaling**: Use Docker Swarm or Kubernetes for multi-instance deployments
5. **Monitoring**: Integrate with monitoring solutions like Prometheus or Grafana

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change the host port if 8080 is already in use:
   ```bash
   docker run -p 9080:3000 demo-dapp-react
   ```

2. **Build failures**: Clear Docker cache:
   ```bash
   docker system prune -a
   ```

3. **Permission issues**: Ensure Docker has proper permissions to access files

### Logs
Check application logs:
```bash
docker logs demo-dapp
```

### Shell Access
Access the running container:
```bash
docker exec -it demo-dapp sh
```
