'use client'
import React from 'react'
import Image from 'next/image'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Maria Rodriguez',
      role: 'Community Leader, Forest Restoration Project',
      quote: 'The AI-powered tree selection and planting recommendations have dramatically improved our reforestation success rate. We\'ve seen a 90% survival rate in our latest projects.',
      photo: '/photo1.jpg'
    },
    {
      name: 'Dr. James Chen', 
      role: 'Environmental Scientist',
      quote: 'The data analytics and monitoring tools have revolutionized how we track forest health and carbon sequestration. It\'s bringing scientific precision to conservation.',
      photo: '/photo2.jpg'
    },
    {
      name: 'Amara Okafor',
      role: 'Sustainable Farming Advocate',
      quote: 'The smart irrigation system has helped our community reduce water usage by 60% while improving crop yields. This technology is a game-changer for sustainable agriculture.',
      photo: '/photo3.jpg'
    }
  ]

  return (
    <section className="py-16 bg-gray-50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Testimonials</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hear from environmental leaders and communities making a real impact with our sustainable solutions.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="relative h-16 w-16 flex-shrink-0">
                  <div className="absolute -top-3 -left-3 text-5xl text-green-300 opacity-50">&ldquo;</div>
                  <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden border-2 border-green-100">
                    <Image 
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-700 italic leading-relaxed">{testimonial.quote}</p>
              
              <div className="mt-4 flex items-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
