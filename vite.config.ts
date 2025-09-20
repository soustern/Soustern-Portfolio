import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';
export default defineConfig({
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'shaders/*', // pasta onde estão seus .glsl
          dest: 'shaders'       // pasta de destino dentro de dist/
        }
      ]
    })
  ],
  base: '/Soustern-Portfolio/'
})