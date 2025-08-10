import React from 'react';
import { Award, Users, Truck, Shield, CheckCircle, Star, Quote } from 'lucide-react';


  const stats = [
    { number: "2+", label: "Années d'expérience", icon: <Award className="h-8 w-8" /> },
    { number: "100+", label: "Clients satisfaits", icon: <Users className="h-8 w-8" /> },
    { number: "75%", label: "Taux de satisfaction", icon: <Star className="h-8 w-8" /> },
    { number: "24h", label: "Livraison garantie", icon: <Truck className="h-8 w-8" /> }
  ];

  const timeline = [
    { year: "2023", title: "Fondation", description: "Création de Daloa ~ Kalifa " },
    { year: "2023", title: "Expansion", description: "Ouverture de notre premier entrepôt régional" }
  ];

  const values = [
    {
      icon: <Shield className="h-12 w-12 text-orange-600" />,
      title: "Qualité Garantie",
      description: "Chaque produit est rigoureusement sélectionné selon nos standards de qualité les plus exigeants."
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: "Partenariat Local",
      description: "Nous soutenons l'économie locale en travaillant exclusivement avec des producteurs de la région."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-orange-600" />,
      title: "Transparence",
      description: "Traçabilité complète de nos produits, de la ferme jusqu'à votre table."
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Cliente fidèle depuis 5 ans",
      content: "La qualité des produits est exceptionnelle. Je recommande vivement FreshMarket à tous mes proches.",
      rating: 5
    },
    {
      name: "Pierre Martin",
      role: "Chef de restaurant",
      content: "Pour mon restaurant, j'ai besoin de produits frais de qualité. FreshMarket livre toujours au-delà de mes attentes.",
      rating: 5
    }
  ];
const  AboutPage = () => {
  return (
    <>
    <div>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
              🏆 Leader français des produits frais bio
            </div> */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              À propos de
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent"> Daloa ~ Kalifa</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Depuis 2023, nous révolutionnons l'accès aux produits frais de qualité en créant
              un pont direct entre les meilleurs producteurs locaux et votre cuisine.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Notre Histoire
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  Bienvenue sur notre boutique en ligne ! Nous sommes une entreprise passionnée par les produits frais, naturels et de qualité.
                </p>
                <p className="mb-6">
                  Depuis notre création en 2023, notre objectif est de fournir à nos clients des produits soigneusement sélectionnés, tout en garantissant un service client exceptionnel. Que ce soit des oignons, des pommes de terre ou des ignames de qualité, nous travaillons avec les meilleurs producteurs.
                </p>
                <p className="mb-6">
                  Notre mission est de rendre vos courses plus simples, plus rapides et plus fiables. Nous croyons en un commerce de proximité, moderne et transparent.
                </p>
                <p>
                  Merci de votre confiance. N'hésitez pas à nous contacter pour toute question ou suggestion.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Évolution</h3>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {item.year}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident chacune de nos actions au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-gradient-to-r from-green-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-green-100">
              La satisfaction client au cœur de notre métier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-gray-300 mb-4" />
                <p className="text-gray-700 text-lg mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Certifications Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Certifications & Engagements
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🌱</div>
              <p className="font-semibold text-gray-900">Agriculture Biologique</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🏆</div>
              <p className="font-semibold text-gray-900">ISO 9001</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">♻️</div>
              <p className="font-semibold text-gray-900">Zéro Déchet</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🇫🇷</div>
              <p className="font-semibold text-gray-900">Made in France</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
    </>
  );
}
export default AboutPage